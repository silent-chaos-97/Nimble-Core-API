const _ = require('lodash')
const moment = require('moment')
const app = require('../../core')
const links = require('../../utils/links')
const log = app.logger.getLogger('services.event_stream.commons')

  const workflowId = _.get(event, 'body.current.workflowId')
  return _.isString(workflowId) && workflowId.trim().length !== 0
