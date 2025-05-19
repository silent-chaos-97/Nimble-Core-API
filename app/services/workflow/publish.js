const app = require('../../core')

// const logger = app.logger.getLogger('app.services.workflow.publish')
const WkflModel = app.models.workflow
const WkflRepo = app.repositories.workflow

// Temp comment
function getNextVersion(version = '0') {
  return (parseInt(version.toString()) + 1).toString()
