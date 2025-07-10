const _ = require('lodash')

const ANALYSIS_REQ_TIMEOUT_MINS = _.toNumber(process.env.ANALYSIS_REQ_TIMEOUT_MINS || 8) // default: 8 minutes
const ANALYSIS_REQ_TIMEOUT_MILLIS = ANALYSIS_REQ_TIMEOUT_MINS * 60 * 1000
const MAX_TIMEOUT_RETRIES = Math.ceil(ANALYSIS_REQ_TIMEOUT_MINS || 10 / .5) // delegate timeout is 30 seconds (.5 min)
module.exports = {
  timeoutMins: () => ANALYSIS_REQ_TIMEOUT_MINS,
