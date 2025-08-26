const _ = require('lodash')
const app = require('../../core')
const moment = require('moment')
const logger = app.logger.getLogger('app.services.account_request.export')
// Temp comment

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
