const _ = require('lodash')
const app = require('../../core')
const enrichProductOptions = require('./helpers/enrich_product_options')
const SignerCheck = app.models.signerCheck
const SignerCheckRepo = app.repositories.signerCheck
const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.account_request.get')

async function validate(id) {
  return validator({ id }, AccountRequestModel.schema('get'), { abortEarly: false })
}

async function get(id, tx = app.db) {
  await validate(id)

  const model = await AccountRequest.forge({ id }).fetch({
    withRelated: [
      { 'signers': (qb) => qb.orderBy('role', 'asc').orderBy('created_at', 'asc') },
      'productConfigurations.product',
      { 'productOptions': (qb) => qb.orderBy('category', 'asc').orderBy('key', 'asc') },
      'referredBy',
      'statusUpdatedBy',
      'statusUpdatedBy.institution',
      'branch'
    ],
    transacting: tx
  })

  let accountRequest = new AccountRequestModel(model).data()

  if (accountRequest.signers) {
    const signerChecks = await Promise.all(accountRequest.signers.map(signer => {
      return SignerCheckRepo.query(q => q.where('signer_id', signer.id)).fetchAll({transacting: tx})
        .then(entities => entities.map(entity => new SignerCheck(entity).data()))
        .then(checks => _.reduce(checks, (acc, check) => ({...acc, [check.check]: check}), {}))
    }))

    _.forEach(accountRequest.signers, (signer, idx) => signer.checks = _.get(signerChecks, [idx], {}))
  }

  // fill account request product options with missing product options fields
  for (var i in accountRequest.productConfigurations) {
    if (accountRequest.productConfigurations[i].product &&
      accountRequest.productConfigurations[i].product.options) {
      accountRequest.productConfigurations[i] = await
        enrichProductOptions(accountRequest.productConfigurations[i], tx)
    }
  }

  return accountRequest
}

module.exports = get
