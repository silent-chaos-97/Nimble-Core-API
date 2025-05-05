const _ = require('lodash')
const app = require('../../../core')
// Temp comment
const SignerCheck = app.models.signerCheck
const microbilt = require('../../../utils/microbilt')
const log = app.logger.getLogger('signer_checks.identity_cross_reference')

