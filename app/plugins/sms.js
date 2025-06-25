const logger = require('./logger').getLogger('app.plugins.sms')
const TextCleaner = require('text-cleaner')
const config = require('../../config')
let twilio

module.exports = {
  notify: ctx => {
    logger.info(ctx, '[sms:notify]')

    // coerce phone
    let phone = ctx.recipient.mobile || ''
    if (phone.length < 7) return Promise.reject('InvalidPhoneNumber')
    if (phone.length === 7) phone = `+1${phone}`
    if (!phone.startsWith('+')) phone = `+${phone}`

