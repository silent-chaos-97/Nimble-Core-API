const _ = require('lodash')
const app = require('../../core')
const moment = require('moment')
const logger = app.logger.getLogger('app.services.account_request.export')

async function copyDocument(documentId, institutionId, eventId) {
  if (!documentId) {
    return null
  }
  // get document filename
  const source = await app.services.document.get({ id: documentId })
  const destination = `${eventId}/${source.key.replace(institutionId + '/', '')}`

  const src = `${source.key}`
  const dst = `${institutionId}/requests/${destination}`

  // copy document over
  try {
    await app.plugins.aws.s3CopyToFTP(src, dst)
  } catch(err) {
    logger.error({ err, op: 'copyDocument', documentId, institutionId, eventId, src, dst, message: `[copyDocument] could not copy file from [/${source.key}] to [ftp:${institutionId}/${destination}]` })
  }

  logger.info({ op: 'copyDocument', phase: 'success', documentId, institutionId, eventId, src, dst })

  return `/requests/${destination}`
}

async function processReports(reports, institutionId, eventId) {
  if (!_.isEmpty(reports)) {
    // only get document if there is a document id
    if (reports[0].documentId) {
      return copyDocument(reports[0].documentId, institutionId, eventId)
    }
  }
}

function getProductTemplate(sku, template) {
  let productTemplate

  _.forEach(_.get(app.plugins.docusign._productTemplates, sku, []), tmpl => {
    if (tmpl === template) {
      productTemplate = { template, name: _.camelCase(template) }
      return false
    }

    if (_.isPlainObject(tmpl) && tmpl.template === template) {
      productTemplate = tmpl
      return false
    }
  })

  return productTemplate
}

function getSkuManifestName(sku, template) {
  const productTemplate = getProductTemplate(sku, template) | {}
  return productTemplate.name || _.camelCase(template)
}

module.exports = async function exporter(accountRequestId, tx = app.db) {

  try {
    // // main fetch
    const accountRequest = await app.services.accountRequest.get(accountRequestId, tx)

    logger.info({ op: 'export', accountRequest })

    if (!accountRequest) throw new Error(`InvalidAccountRequest[${accountRequestId}]`)

    accountRequestId = accountRequest.id // ensure case insensitive, from db, identifier

    const eventId = accountRequestId + '-' + moment().format('YYMMDDHHMMSS')

    logger.info({ phase: 'start', accountRequestId, eventId, msg: `[exporter] called with [${accountRequestId}]` })

    // BSA questions to be apendend to accountRequest
    const bsa = await app.services.bsaRiskResult.list({ accountRequestId }, tx)

    // copy PDF documents for every product
    const productSKUs = accountRequest.productConfigurations.map(c => c.product.sku)
    const co = accountRequest.signers.length > 1
    // push document definitions
    let documents = []
    for (const sku of productSKUs) {
      const envelope = await app.plugins.docusign.getEnvelopeFileContents(accountRequest.contractDocumentEnvelopeId, sku, co)
      if (envelope) {
        documents = await Promise.all(envelope.map(async pdf => {
          const template = getProductTemplate(pdf.sku, pdf.template)
          const name = getSkuManifestName(pdf.sku, pdf.template) || pdf.filename
          const filename = `${eventId}/${sku}.${pdf.filename}.pdf`

          // upload PDF file to FTP bucket
          const s3File = await app.plugins.aws._s3SaveToFTP(
            `${accountRequest.institutionId}/requests/${filename}`, // key
            pdf.file, // buffer
            { ContentType: 'application/pdf' } // options
          )

          let formData

          if (_.isArray(template.exports)) {
            try { // FIXME: this is a go-live stop-gap, where we perform OCR of each form to present its data, the docusign api is not returning protected fields (but it does render them)
              formData = await app.plugins.aws.invokeLambda({
                FunctionName: 'nimble-data-svc-dev-api-lambda',
                Payload: JSON.stringify({
                  httpMethod: 'post',
                  pathParameters: { provider: 'image-processors/forms' },
                  body: { document: { Bucket: s3File.Bucket, Name: s3File.Key } }
                })
              }).then(res => {
                try {
                  return JSON.parse(res.Payload)
                } catch(err) {
                  return null
                }
              }).then(Payload => {
                logger.info({ Payload })
                try {
                  return JSON.parse(Payload.body)
                } catch(err) {
                  return null
                }
              }).then(res => !res || !_.isArray(res.forms) ? null : _.reduce(res.forms, (memo, datum) => {
                if (!_.isNil(datum.key) && !_.isNil(datum.value) && _.isNumber(datum.confidence) && datum.confidence > 49) {
                  const key = _.camelCase(`${datum.key}`.trim())
                  if (template.exports.includes(key)) memo[key] = `${datum.value}`.trim()
                }

                return memo
              }, {}))

              logger.info({ op: 'extractFormData', document: name, formData })
            } catch(err) {
              logger.error({ err, code: 'FailedToExtractForms', s3File })
            }
          }

          return {
            name,
            location: `/requests/${filename}`,
            formData: formData || {}
          }
        }))
      }
    }

    // copy signer documents
    for (const signer of accountRequest.signers) {
      for (const doc of ['frontIdProofDocumentId', 'backIdProofDocumentId']) {
        // copy signer document and get destination
        signer[doc.replace(new RegExp('Id' + '$'), 'Uri')] = await copyDocument(signer[doc], accountRequest.institutionId, eventId)
      }

      // get last credit report record and copy to s3
      const creditReportPayload = {
        signerId: signer.id,
        limit: 1,
        sort: '-updated_at'
      }
      const creditReports = await app.services.creditReport.list(creditReportPayload)
      signer.creditReportUri = await processReports(creditReports, accountRequest.institutionId, eventId)

      // get compliance report record and copy to s3
      const complianceReports = await app.services.complianceVerification.list(signer.id)
      signer.complianceReportUri = await processReports(complianceReports, accountRequest.institutionId, eventId)
    }

    // build final obj
    const data = {
      bsa,
      documents,
      ...accountRequest
    }

    const exportPackage = {
      name: 'account_request_approved',
      rid: eventId,
      timestamp: moment().format('YYYY-MM-DDTHH:MM:SS'),
      href: `${app.config.get('protocol')}://${app.config.get('domain')}/accounts/${accountRequestId}`,
      data
    }

    // serialize XML
    const xmlFileContent = app.serializers.v1.eventXml(exportPackage)

    // upload XMl file to FTP bucket
    try {
      await app.plugins.aws._s3SaveToFTP(
        `${accountRequest.institutionId}/requests/${eventId}.xml`, // key
        Buffer.from(xmlFileContent, 'utf-8'), // buffer
        { ContentType: 'text/xml' } // options
      )
    } catch(err) {
      logger.error(err, `[exporter] could not save xml file for ${accountRequestId}`)
      throw err
    }

    logger.info({ phase: 'ended', format: 'json', accountRequestId, eventId, exportPackage })
    logger.info({ phase: 'ended', format: 'xml', accountRequestId, eventId, xmlFileContent })
  } catch(err) {
    logger.error(err, `FailedToExport: ${accountRequestId}`)
    throw err
  }
}
