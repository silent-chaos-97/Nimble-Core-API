const _ = require('lodash')

module.exports = async function(risk, summary) {
  const score = _.get(summary, 'credit.value')

  if (!score) return {
    score: -1,
    performing: false,
    disqualifying: true
  }

  const performingScore = _.toNumber(risk.performance_standard)
  let highPerformingScore = risk.high_performance_standard ? _.toNumber(risk.high_performance_standard) : performingScore
  if (!_.isFinite(highPerformingScore)) highPerformingScore = performingScore
