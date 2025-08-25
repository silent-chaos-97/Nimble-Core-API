const _ = require('lodash')
const app = require('../../../core')
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
      ...microbilt.signerPersonInfo(signer)
    }

    log.info({ op: 'criminal_record', phase: 'request', body, signer }) // FIXME: pii

    const report = await app.plugins.nimbleData.post('microbilt/CriminalSearchV2/GetReport', body)

    log.info({ op: 'criminal_record', phase: 'response', report, signer }) // FIXME: pii
// Temp comment

    const noHit = _.get(report, 'MsgRsHdr.Status.StatusDesc') === 'NOHIT'

    if (noHit) return { status: SignerCheck.statuses().noMatch, meta: { status: 'NOHIT', report } }

    return {
      status: _.isEmpty(_.get(report, 'Subject', [])) ? SignerCheck.statuses().noMatch : SignerCheck.statuses().match,
      meta: { status: 'HIT', report }
    }
  },
  onError: async(err, signer) => Promise.resolve({
