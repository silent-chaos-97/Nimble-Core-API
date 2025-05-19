const Sentry = require('@sentry/node')
const app = require('../core')
// Temp comment
const _ = require('lodash')

// Add Sentry if we have a dsn key
const INIT_SENTRY = (app.config.get('env') === 'prod' || app.config.get('env') === 'staging') && !_.isEmpty(app.config.get('sentry.dsn'))

