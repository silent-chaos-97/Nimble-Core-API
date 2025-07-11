const _ = require('lodash')
const app = require('../../core')
const PreconditionFailedError = require('../../errors/precondition_failed')
const createProductConfigurations = require('./helpers/create_product_configurations')
const referrers = require('./helpers/referrers')

const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const AccountRequestProduct = app.repositories.accountRequestProduct
const AccountRequestProductOption = app.repositories.accountRequestProductOption
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.account_request.update')

const whitelist = AccountRequestModel.props()

const EVENT_TYPE_STATUS = 'account_request_status_changed'
const EVENT_TYPE_APPROVED = 'account_request_approved'

async function validate(params) {
  let data = _.pick(params, whitelist)
  validator(data, AccountRequestModel.schema('update'), { abortEarly: false })
  return data
}

function getSignerFullName(signer) {
  if (signer == null) {
    return ''
  }

  const names = []
  if (signer.firstName) names.push(signer.firstName)
  if (signer.middleName) names.push(signer.middleName)
  if (signer.lastName) names.push(signer.lastName)

  return names.join(' ').trim()
}

async function emitAccountRequestEvent(id, type, body = null) {
  const promises = [app.services.eventStream.publish('topicEvent', { id, type: type.toUpperCase(), body })]

  if (type === EVENT_TYPE_APPROVED) {
    promises.push(app.services.eventStream.publish('topicAccountRequest', { id, type, body }))
  }

  return Promise.all(promises)
}

/**
 * Send a message to all the signers informing the account was approved or declined
 *
 * @param {string} statusTo - status transitioned to
 * @param {*} accountRequest - account request obj
 * @param {*} options - extra options to send to the email (like subject, etc)
 */
async function sendAprovedDeclinedMessage(statusTo, accountRequest, options) {
  // send email to each signer
  const statusEmailBody = options.statusEmailBody
  return Promise.all(accountRequest.signers.map(async signer => {
    if (!signer.emailVerified) return Promise.resolve()

    options.statusEmailBody = statusEmailBody
      .replace(/{\$Signer_FirstName}/g, signer.firstName)
      .replace(/{\$Signer_FullName}/g, getSignerFullName(signer))

    logger.debug(`[sendAprovedDeclinedMessage] email sent on transition status to ${statusTo} for email ${signer.email}`)

    return app.plugins.email.sendAccountRequestStatus(statusTo, {
      email: signer.email,
      ...options
    })
  }))
