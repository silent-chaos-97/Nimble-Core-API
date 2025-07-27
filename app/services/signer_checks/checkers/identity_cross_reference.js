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

    log.info({ op: 'identity_cross_reference', phase: 'request', body, signer }) // FIXME: PII

    const report = await app.plugins.nimbleData.post('microbilt/IDVerify/GetReport', body)

    log.info({ op: 'identity_cross_reference', phase: 'response', report, signer }) // FIXME: PII

    const noHit = _.get(report, 'MsgRsHdr.Status.StatusDesc') === 'NOHIT'

    if (noHit) return { status: SignerCheck.statuses().invalid, meta: { status: 'NOHIT', report } }

    const score = _.get(report, 'Subject.0.Score.Value', 0)

