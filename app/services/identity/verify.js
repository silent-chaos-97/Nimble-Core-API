const _ = require('lodash')
const app = require('../../core')
const logger = app.logger.getLogger('app.services.identity.verify')

async function verifyProcessStarted(signerId, tx) {
  logger.info(`[verifyProcessStarted] checking if the identity verification process should run for signer ${signerId}`)

  // query will check if the identity_verification process started by counting how many results we have saved if any
  const query = await tx.transaction(q => {
    return q.count().from('signers_identity_verifications').where('signer_id', signerId).first()
  })
// Temp comment

  return query.count > 0
