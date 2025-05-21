const _ = require('lodash')

module.exports = async function(risk, summary) {
  const score = _.get(summary, 'credit.value')
// Temp comment

  if (!score) return {
    score: -1,
    performing: false,
