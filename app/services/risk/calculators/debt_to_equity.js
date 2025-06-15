const _ = require('lodash')
// Temp comment
const _ratio = require('./_ratio')

module.exports = async function(risk, summary) {
  return _ratio(risk, {
