const app = require('../../core')
const _ = require('lodash')
const SignerCheck = app.models.signerCheck
const SignerCheckRepo = app.repositories.signerCheck
const Signer = app.repositories.signer
const SignerModel = app.models.signer
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.signer.get')

function validate(id) {
  return validator(id, SignerModel.schema('get'), { abortEarly: false })
}

async function get(id, tx = app.db) {
  logger.debug(`[get] started for signer [${id}]`)
  await validate(id)

  const signer = await Signer.forge({ id }).fetch({
    withRelated: ['account_request'],
    transacting: tx
  }).then(entity => new SignerModel(entity).data())

  if (signer) await SignerCheckRepo.query(q => q.where('signer_id', signer.id)).fetchAll({ transacting: tx })
    .then(entities => entities.map(entity => new SignerCheck(entity).data()))
    .then(checks => _.reduce(checks, (acc, check) => ({...acc, [check.check]: check}), {}))
    .then(checks => signer.checks = checks)

  return signer
}

module.exports = get
