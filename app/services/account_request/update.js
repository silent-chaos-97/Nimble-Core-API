const _ = require('lodash')
const app = require('../../core')
const PreconditionFailedError = require('../../errors/precondition_failed')
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
