const _ = require('lodash')
const app = require('../../../core')
const SignerCheck = app.models.signerCheck
const microbilt = require('../../../utils/microbilt')

module.exports = {
  id: 'identity_cross_reference',
  name: 'Identity Cross Reference',
  order: 1,
  check: async(signer) => {
    const body = microbilt.signerPersonInfo(signer)

    log.info({ op: 'identity_cross_reference', phase: 'request', body, signer }) // FIXME: PII

