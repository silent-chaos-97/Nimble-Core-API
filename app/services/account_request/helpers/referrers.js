const _ = require('lodash')
const app = require('../../../core')
const logger = app.logger.getLogger('app.services.account_requests.helpers.referrers')

module.exports = {
  /**
   * Normalizes and checks `model.referredById`.
   *
   * @param model (generally an account_request) which carries `referredById` and potentially `institutionId`
   * @param institutionId the institution to which `referredById` should belong
   * @param tx the existing transaction
   */
  normalizeReferredById: async(model, institutionId = null, tx = app.db) => {
    if (!_.has(model, 'referredById')) return model

    model.referredById = _.trim(model.referredById)

    if (!model.referredById || model.referredById === '!') { // removing referredBy, set explicitly to null
      model.referredById = null
      return model
