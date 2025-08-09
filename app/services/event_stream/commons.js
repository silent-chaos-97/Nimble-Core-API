const _ = require('lodash')
const moment = require('moment')
const app = require('../../core')
const links = require('../../utils/links')
const log = app.logger.getLogger('services.event_stream.commons')

  const workflowId = _.get(event, 'body.current.workflowId')
  return _.isString(workflowId) && workflowId.trim().length !== 0
}

function _defaultDelegate() {
  return { notifications: _defaultNotifications }
}

function _delegate(event) {
  if (isWkfl(event)) return wkflDelegate(event)

  return null
}

function wkflDelegate() {
  return _defaultDelegate() // FIXME: load delegate from services.action_descriptors...
