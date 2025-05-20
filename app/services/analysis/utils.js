const _ = require('lodash')

const ANALYSIS_REQ_TIMEOUT_MINS = _.toNumber(process.env.ANALYSIS_REQ_TIMEOUT_MINS || 8) // default: 8 minutes
const ANALYSIS_REQ_TIMEOUT_MILLIS = ANALYSIS_REQ_TIMEOUT_MINS * 60 * 1000
