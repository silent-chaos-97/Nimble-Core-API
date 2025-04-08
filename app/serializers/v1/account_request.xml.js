const { encode } = require('html-entities')
const app = require('../../core')
const moment = require('moment')
const _ = require('lodash')
function serializer(data) {
  const tag = app.plugins.xml.tag
  const format = app.plugins.xml.format

  return format(tag('accountRequest', {
    updatedAt: moment(data.statusUpdatedAt).format('YYYY-MM-DDTHH:MM:SS'),
    updatedBy: data.statusUpdatedBy ? data.statusUpdatedBy.email : null,
    branchCode: data.branch ? data.branch.externalId : null
  }, [
    tag('id', {}, data.id),
    tag('documents', {
      signedAt: moment(data.contractDocumentEnvelopeStatusUpdatedAt).format('YYYY-MM-DDTHH:MM:SS')
    }, _.get(data, 'documents', []).map(document => {
      return tag('document', { name: document.name, location: document.location }, _.map((document.formData || {}), (value, name) => {
        return tag('field', { name, value: encode(value, { mode: 'nonAscii', level: 'xml' }) })
      }))
    })),
    tag('bsa', {}, [
      tag('score', {}, data.bsaScore?.toString()),
      tag('questions', {}, data.bsa?.map(question => tag('question', {
          id: question.questionId,
          text: question.context.text
        },
        question.answer
      )))
    ]),
    tag('signers', {}, data.signers.map(signer => {
      let documents
      if (signer.documentType === 'PASSPORT') {
        documents = [
          tag('document', { name: 'passport', location: signer.frontIdProofDocumentUri })
        ]
      } else {
        documents = [
          tag('document', { name: 'frontDocument', location: signer.frontIdProofDocumentUri }),
          tag('document', { name: 'backDocument', location: signer.backIdProofDocumentUri })
        ]
      }
      if (signer.creditReportUri) {
        documents.push(tag('document', { name: 'creditReport', location: signer.creditReportUri }))
      }
      if (signer.complianceReportUri) {
        documents.push(tag('document', { name: 'complianceReport', location: signer.complianceReportUri }))
      }

      return tag('signer', {}, [
        tag('id', {}, signer.id),
        tag('dateOfBirth', {}, moment(signer.dateOfBirth).format('YYYY-MM-DD')),
        tag('email', {}, signer.email),
        tag('firstName', {}, signer.firstName),
        tag('middleName', {}, signer.middleName),
        tag('lastName', {}, signer.lastName),
        tag('phoneNumber', {}, signer.phoneNumber),
        tag('ssn', {}, signer.ssn),
        tag('role', {}, signer.role),
        tag('employer', {}, signer.employer),
        tag('address', {}, [
          tag('street', {}, signer.address),
          tag('city', {}, signer.city),
          tag('state', {}, signer.state),
          tag('zipCode', {}, signer.zipCode)
        ]),
        tag('proof', { documentType: signer.documentType }, [
          tag(signer.documentType.toLowerCase(), {}, [
            tag('number', {}, signer.documentNumber),
            tag('expirationDate', {}, moment(signer.documentExpirationDate).format('YYYY-MM-DD')),
            tag('issuedDate', {}, moment(signer.documentIssuedDate).format('YYYY-MM-DD')),
            tag(signer.documentType === 'USDL' ? 'issuedState' : 'issuer', {}, signer.documentIssuer),
            tag('documents', {}, documents)
          ])
        ])
      ])
    })),
    tag('productConfigurations', {}, data.productConfigurations.map(pConfig => {
      let productOptionsArray = [
        tag('productOption', {
          category: 'product_config', key: 'initial_deposit', value: pConfig.initialDeposit
        })
      ]

      pConfig.product.options.map(poConfig => {
        let category = poConfig.category
        if (poConfig.key === 'account_number') {
          category = 'product_config'
        }

        productOptionsArray.push(
          tag('productOption', {
            category: category,
            key: poConfig.key,
            value: poConfig.value
          })
        )
      })

      return tag('productConfiguration', { product_sku: pConfig.product.sku }, productOptionsArray)
    }))
  ]))
