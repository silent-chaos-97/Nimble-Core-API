const _ = require('lodash')
const app = require('../../core')
const PreconditionFailed = require('../../errors/precondition_failed')

const AccountRequest = app.repositories.accountRequest
const logger = app.logger.getLogger('app.services.contract.update')


function getProductName(productConfigurations) {
  if (productConfigurations.length > 0) {
    return productConfigurations[0].product.name
  }
  return 'Missing Product Name'
