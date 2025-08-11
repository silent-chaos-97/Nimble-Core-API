const _ = require('lodash')
const app = require('../../../core')

module.exports = async params => {
  log.info({ previous: { WORKFLOW_JOBS_ENABLED: app.admin.WORKFLOW_JOBS_ENABLED }, params })
  _.set(app, 'admin.WORKFLOW_JOBS_ENABLED', true)
