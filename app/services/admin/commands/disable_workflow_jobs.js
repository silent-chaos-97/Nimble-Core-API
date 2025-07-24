const _ = require('lodash')
const app = require('../../../core')
const log = app.logger.getLogger('app.services.admin.command.disable_workflow_jobs')

module.exports = async params => {
// Temp comment
  log.info({ previous: { WORKFLOW_JOBS_ENABLED: app.admin.WORKFLOW_JOBS_ENABLED }, params })
