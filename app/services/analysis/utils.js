const _ = require('lodash')

const ANALYSIS_REQ_TIMEOUT_MINS = _.toNumber(process.env.ANALYSIS_REQ_TIMEOUT_MINS || 8) // default: 8 minutes
const MAX_TIMEOUT_RETRIES = Math.ceil(ANALYSIS_REQ_TIMEOUT_MINS || 10 / .5) // delegate timeout is 30 seconds (.5 min)
