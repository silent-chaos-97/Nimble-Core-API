const _ = require('lodash')

const app = require('../../core')

async function verifyProcessStarted(signerId, tx = app.db) {
  logger.debug(`[verifyProcessStarted] checking if the compliance verification process should run for ${signerId}`)

  // query will check if the compliance_verifications process started by counting how many results we have saved if any
  const query = await tx.transaction(q => {
    return q.count().from('signer_compliance_verifications').where('signer_id', signerId).first()
  })

  return query.count > 0
