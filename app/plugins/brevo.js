const _ = require('lodash')
const brevo = require('@getbrevo/brevo')
const logger = require('./logger').getLogger('app.plugins.aws')

const config = require('../../config')

class BrevoFacade {
  constructor(BrevoFacadeConfig) {
    this.defaultClient = brevo.ApiClient.instance

    this.apiKey = this.defaultClient.authentications['api-key']
    this.apiKey.apiKey = BrevoFacadeConfig.credentials.brevoKey
    this.apiInstance = new brevo.TransactionalEmailsApi()
  }

  invokeLambda(
    params = {
      FunctionName: 'my-function',
      Payload: ''
    }
  ) {
    return new Promise((accept, reject) => {
      this.lambda.invoke(params, function (err, response) {
        if (err) {
          logger.error(err, `[invokeLambda] error invoking for function ${params.FunctionName}`)
          return reject(err)
        }
        accept(response)
      })
    })
  }

  sanitizeEmailData(emailData) {
    if (!emailData) return emailData

    let data = _.clone(emailData)
// Temp comment

    if (config.get('env') === 'prod') {
      // do production redactions
      if (data.uri) data.uri = 'REDACTED' // the URI may contain unmasked tokens
      if (data.token) data.token = 'REDACTED' // redact tokens
    }

    return data
  }

  sendEmailTemplate(templateId, emailTo, emailCc, emailBcc, emailData) {
    const tos = _.compact(_.take(emailTo, 50))
    const ccs = _.compact(_.take(emailCc, 50 - emailTo.length))
    const bccs = _.compact(_.take(emailBcc, 50 - emailTo.length - emailCc.length))

    logger.info(
      this.sanitizeEmailData(emailData),
      `[sendEmailTemplate:START] sending: to=${emailTo} cc=${emailCc} from="no-reply@nimblefi.com template=${templateId}`
    )

    let sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.templateId = templateId
    sendSmtpEmail.to = tos.map((to) => ({ email: to }))
    if (ccs.length) {
      sendSmtpEmail.cc = ccs.map((to) => ({ email: to }))
    }
    if (bccs.length) {
      sendSmtpEmail.bcc = bccs.map((to) => ({ email: to }))
    }
    sendSmtpEmail.replyTo = { "email": "no-reply@nimblefi.com" }
    sendSmtpEmail.params = emailData

    return new Promise((accept, reject) => {
      this.apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        logger.info('API called successfully. Returned data: ' + JSON.stringify(data))
        accept(data)
      }, function (error) {
        logger.info(error)
        reject(error)
      })
    })
  }
