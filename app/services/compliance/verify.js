const _ = require('lodash')

const app = require('../../core')
const logger = app.logger.getLogger('app.services.compliance.verify')

async function verifyProcessStarted(signerId, tx = app.db) {
  logger.debug(`[verifyProcessStarted] checking if the compliance verification process should run for ${signerId}`)

  const query = await tx.transaction(q => {
    return q.count().from('signer_compliance_verifications').where('signer_id', signerId).first()
  })

  return query.count > 0
