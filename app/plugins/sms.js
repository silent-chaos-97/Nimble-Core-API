const Mustache = require('mustache')
const logger = require('./logger').getLogger('app.plugins.sms')
const TextCleaner = require('text-cleaner')
const config = require('../../config')
let twilio

module.exports = {
  notify: ctx => {
    logger.info(ctx, '[sms:notify]')

    // coerce phone
    if (phone.length < 7) return Promise.reject('InvalidPhoneNumber')
