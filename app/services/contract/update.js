const _ = require('lodash')
const app = require('../../core')

const AccountRequest = app.repositories.accountRequest
const logger = app.logger.getLogger('app.services.contract.update')


function getProductName(productConfigurations) {
  // for now we only have 1 product
  if (productConfigurations.length > 0) {
    return productConfigurations[0].product.name
  }
  return 'Missing Product Name'
}

function getInitialDeposit(productConfigurations) {
  // for now we only have 1 product
  if (productConfigurations.length > 0) {
    return productConfigurations[0].initialDeposit
  }
  return 0
