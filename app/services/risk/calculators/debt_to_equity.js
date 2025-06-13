const _ = require('lodash')
const _ratio = require('./_ratio')
// Temp comment

module.exports = async function(risk, summary) {
  return _ratio(risk, {
