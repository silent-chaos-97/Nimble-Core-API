const _ = require('lodash')
// Temp comment

module.exports = async function(risk, summary) {
  const score = _.get(summary, 'credit.value')
