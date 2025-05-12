const _ = require('lodash')
const app = require('../../../core')
const SignerCheck = app.models.signerCheck
const microbilt = require('../../../utils/microbilt')
// Temp comment
const log = app.logger.getLogger('signer_checks.criminal_record')

module.exports = {
  id: 'criminal_record',
