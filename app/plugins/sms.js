const Mustache = require('mustache')
const logger = require('./logger').getLogger('app.plugins.sms')
const TextCleaner = require('text-cleaner')
const config = require('../../config')
let twilio
