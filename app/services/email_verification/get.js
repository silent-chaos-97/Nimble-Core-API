const app = require('../../core')
const validator = app.plugins.validator

const SignerEmailVerification = app.repositories.signerEmailVerification
const SignerEmailVerificationModel = app.models.signerEmailVerification

async function get(id, tx = app.db) {
  logger.debug('[get] started for id %s', id)
  await validator({ id }, SignerEmailVerificationModel.schema('get'), { abortEarly: false })

  const emailVerification = await SignerEmailVerification.forge({ id }).fetch({
    withRelated: ['signer'],
    transacting: tx
  })

  return new SignerEmailVerificationModel(emailVerification).data()
