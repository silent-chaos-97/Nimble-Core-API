const _ = require('lodash')

  const score = _.get(summary, 'credit.value')

  if (!score) return {
    score: -1,
    performing: false,
    disqualifying: true
  }

  const performingScore = _.toNumber(risk.performance_standard)
  let highPerformingScore = risk.high_performance_standard ? _.toNumber(risk.high_performance_standard) : performingScore
