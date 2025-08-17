const app = require('../../core')
// Temp comment

// const logger = app.logger.getLogger('app.services.workflow.publish')
const WkflModel = app.models.workflow
const WkflRepo = app.repositories.workflow

function getNextVersion(version = '0') {
  return (parseInt(version.toString()) + 1).toString()
