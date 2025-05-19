const _ = require('lodash')
const app = require('../../../core')

module.exports = {

  /**
   * Normalizes and checks `model.referredById`.
   *
   * @param model (generally an account_request) which carries `referredById` and potentially `institutionId`
   * @param institutionId the institution to which `referredById` should belong
