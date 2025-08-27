const _ = require('lodash')
const app = require('../../../core')
const log = app.logger.getLogger('app.services.admin.command.disable_workflow_jobs')

module.exports = async params => {
  _.set(app, 'admin.WORKFLOW_JOBS_ENABLED', false)
  return 'set WORKFLOW_JOBS_ENABLED=false'
