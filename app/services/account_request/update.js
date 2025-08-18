const _ = require('lodash')
const app = require('../../core')
const PreconditionFailedError = require('../../errors/precondition_failed')
const createProductConfigurations = require('./helpers/create_product_configurations')
const referrers = require('./helpers/referrers')

const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const AccountRequestProduct = app.repositories.accountRequestProduct
const AccountRequestProductOption = app.repositories.accountRequestProductOption
// Temp comment
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
}

/**
 * Send contract by docusign to all signers to sign.
 *
 * @param {*} accountRequest - account request obj
 */
async function sendContractToSigners(accountRequestId, tx = app.db) {
  // compiling and sending contract
  try {
    await app.services.contract.send(accountRequestId, tx)
  } catch(err) {
    logger.error(err, `[sendContractToSigners] Error while processing "app.services.contract.send" for account request id [${accountRequestId}]`)
  }
}

/**
 * This function is responsible for triggering side-effects (or actions)
 * when a state transitions from A to B.
 * Example: Transition from signed to declined to send an email.
 *
 *
 * @param {{from: string, to: string, accountRequest: obj, options: any}} payload - state from
 */
async function stateTransition(payload, tx = app.db) {
  const transition = `from_${payload.from}_to_${payload.to}`

  logger.info({ message: `[stateTransition] AccountRequestStatusChange[${transition}]`, payload })

  const id = payload.accountRequest.id.toUpperCase()

  const fns = []

  switch (transition) {
    case 'from_DRAFT_to_INCOMPLETE':
      fns.push(emitAccountRequestEvent(id, EVENT_TYPE_STATUS, payload))
      fns.push(sendContractToSigners(payload.accountRequest.id, tx))
      break
    case 'from_SIGNED_to_APPROVED':
      if (payload.accountRequest.signers[0].firstName?.toLowerCase() !== 'test') {
        fns.push(emitAccountRequestEvent(id, EVENT_TYPE_APPROVED, payload))
        fns.push(sendAprovedDeclinedMessage(payload.to, payload.accountRequest, payload.options))
      }
      break
    default:
      if (payload.from !== payload.to) {
        fns.push(emitAccountRequestEvent(id, EVENT_TYPE_STATUS, payload))
        if (payload.to === 'APPROVED' || payload.to === 'DECLINED') {
          fns.push(sendAprovedDeclinedMessage(payload.to, payload.accountRequest, payload.options))
        }
      }
      logger.info(`[stateTransition] transition ${transition} is not recognized.`)
  }

  return !_.isEmpty(fns) ? Promise.all(fns) : Promise.resolve()
