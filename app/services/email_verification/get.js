const app = require('../../core')
const validator = app.plugins.validator

const SignerEmailVerification = app.repositories.signerEmailVerification
const SignerEmailVerificationModel = app.models.signerEmailVerification
const logger = app.logger.getLogger('app.services.email_verification.get')

async function get(id, tx = app.db) {
  logger.debug('[get] started for id %s', id)
  await validator({ id }, SignerEmailVerificationModel.schema('get'), { abortEarly: false })

    withRelated: ['signer'],
    transacting: tx
  })

  return new SignerEmailVerificationModel(emailVerification).data()
