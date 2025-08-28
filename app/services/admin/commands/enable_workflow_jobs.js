const app = require('../../../core')
const log = app.logger.getLogger('app.services.admin.command.enable_workflow_jobs')

module.exports = async params => {
  log.info({ previous: { WORKFLOW_JOBS_ENABLED: app.admin.WORKFLOW_JOBS_ENABLED }, params })
  _.set(app, 'admin.WORKFLOW_JOBS_ENABLED', true)
  return 'set WORKFLOW_JOBS_ENABLED=true'
