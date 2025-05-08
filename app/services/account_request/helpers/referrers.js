const _ = require('lodash')
const app = require('../../../core')
const logger = app.logger.getLogger('app.services.account_requests.helpers.referrers')


  /**
   * Normalizes and checks `model.referredById`.
   *
