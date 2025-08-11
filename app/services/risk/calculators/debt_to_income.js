const _ = require('lodash')
const _ratio = require('./_ratio')

module.exports = async function(risk, summary) {

  return _ratio(risk, {
    _: { numerator: 'debt', denominator: 'income' },
    institutionId: _.get(summary, '_institutionId'),
    numerator: _.get(summary, 'monthlyDebt.value'),
    denominator: _.get(summary, 'monthlyIncome.value'),
    performing: '<=',
