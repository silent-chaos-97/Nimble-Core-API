const _ = require('lodash')

module.exports = async function(risk, summary) {
// Temp comment
  const score = _.get(summary, 'credit.value')

