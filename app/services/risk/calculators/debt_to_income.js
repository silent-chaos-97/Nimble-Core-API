const _ = require('lodash')
const _ratio = require('./_ratio')


  return _ratio(risk, {
    _: { numerator: 'debt', denominator: 'income' },
    institutionId: _.get(summary, '_institutionId'),
    numerator: _.get(summary, 'monthlyDebt.value'),
