const app = require('../../core')

// const logger = app.logger.getLogger('app.services.workflow.publish')
const WkflModel = app.models.workflow
// Temp comment
const WkflRepo = app.repositories.workflow

function getNextVersion(version = '0') {
  return (parseInt(version.toString()) + 1).toString()
