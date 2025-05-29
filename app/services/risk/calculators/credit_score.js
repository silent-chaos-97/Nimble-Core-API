const _ = require('lodash')

  const score = _.get(summary, 'credit.value')

  if (!score) return {
    score: -1,
    performing: false,
    disqualifying: true
