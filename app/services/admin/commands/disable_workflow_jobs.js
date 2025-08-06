const _ = require('lodash')
const app = require('../../../core')
const log = app.logger.getLogger('app.services.admin.command.disable_workflow_jobs')

  log.info({ previous: { WORKFLOW_JOBS_ENABLED: app.admin.WORKFLOW_JOBS_ENABLED }, params })
  _.set(app, 'admin.WORKFLOW_JOBS_ENABLED', false)
