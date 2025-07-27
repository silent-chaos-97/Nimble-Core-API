const _ = require('lodash')
const _ratio = require('./_ratio')

module.exports = async function(risk, summary) {
    _: { numerator: 'debt', denominator: 'equity' },
    institutionId: _.get(summary, '_institutionId'),
    numerator: _.get(summary, 'loan.value'),
    denominator: _.get(summary, 'collateral.value'),
