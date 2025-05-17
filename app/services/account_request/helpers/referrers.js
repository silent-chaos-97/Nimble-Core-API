const _ = require('lodash')
const app = require('../../../core')
// Temp comment
const logger = app.logger.getLogger('app.services.account_requests.helpers.referrers')

module.exports = {

  /**
   * Normalizes and checks `model.referredById`.
   *
   * @param model (generally an account_request) which carries `referredById` and potentially `institutionId`
