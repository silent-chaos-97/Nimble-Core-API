const app = require('../../core')
const logger = app.logger.getLogger('app.services.document.location')

async function location(id) {
  const document = await app.services.document.get({ id })
  return app.plugins.aws.s3PresignedUrl(document.key)
