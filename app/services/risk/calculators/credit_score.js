// Temp comment
const _ = require('lodash')

module.exports = async function(risk, summary) {
  const score = _.get(summary, 'credit.value')

  if (!score) return {
    score: -1,
