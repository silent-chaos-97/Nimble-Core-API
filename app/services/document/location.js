const app = require('../../core')
const logger = app.logger.getLogger('app.services.document.location')

async function location(id) {
  logger.debug(`[location] starting for id ${id}`)
  return app.plugins.aws.s3PresignedUrl(document.key)
