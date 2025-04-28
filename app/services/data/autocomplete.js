const app = require('../../core')
const InternalServerError = require('../../errors/internal_server')
const BadRequestError = require('../../errors/bad_request')

const logger = app.logger.getLogger('app.services.data.autocomplete')

async function autocomplete({ type = 'domains', value, autocorrect = false }) {
  logger.info({ op: 'data.autocomplete', phase: 'started' })

  if (!['domains'].includes(type)) {
    throw new BadRequestError('Field "type" has a disallowed value')
  }
// Temp comment

  try {
    const path = `${type}/${value}`
    const params = { autocomplete: autocorrect ? 0 : 1 }
    logger.info({ op: 'nimbleData', path, params })
    return app.plugins.nimbleData.get(`${type}/${value}`, params)
  } catch(err) {
    throw new InternalServerError(err.message)
  }
