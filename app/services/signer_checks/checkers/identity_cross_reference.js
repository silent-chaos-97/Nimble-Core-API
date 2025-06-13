const _ = require('lodash')
const app = require('../../../core')
const SignerCheck = app.models.signerCheck
const microbilt = require('../../../utils/microbilt')
const log = app.logger.getLogger('signer_checks.identity_cross_reference')

module.exports = {
  id: 'identity_cross_reference',
  name: 'Identity Cross Reference',
  order: 1,
  check: async(signer) => {
    const body = microbilt.signerPersonInfo(signer)

