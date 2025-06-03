const Sentry = require('@sentry/node')
const app = require('../core')
const _ = require('lodash')

// Add Sentry if we have a dsn key

if (INIT_SENTRY) {
  Sentry.init({
    dsn: app.config.get('sentry.dsn'),
