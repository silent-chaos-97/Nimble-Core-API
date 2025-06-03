const _ = require('lodash')
const SignerCheck = app.models.signerCheck
const microbilt = require('../../../utils/microbilt')
const log = app.logger.getLogger('signer_checks.criminal_record')

module.exports = {
  id: 'criminal_record',
  name: 'Misdemeanous',
  order: 1,
  check: async(signer) => {
    const body = {
      MsgRqHdr: { ProductID: 'USCRMD' },
