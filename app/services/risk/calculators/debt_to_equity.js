const _ = require('lodash')

module.exports = async function(risk, summary) {
  return _ratio(risk, {
    _: { numerator: 'debt', denominator: 'equity' },
    institutionId: _.get(summary, '_institutionId'),
