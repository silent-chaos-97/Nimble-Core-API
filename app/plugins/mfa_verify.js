const _ = require('lodash')
// const config = require('../../config')

// const accountSid = config.get('twilio.accountSid')
// const serviceSid = config.get('twilio.serviceSid')
// const authToken = config.get('twilio.authToken')
const accountSid = "AC0cb2381b7efb6f8b47ebde709b1d74e6"
const serviceSid = "VAfc8c1349196f6572c317aaff4a5075b6"
const authToken = "7fd100bb4d96bbde0718581c7598de47"

/**
 * Normalize phone numbers, currently only US numbers supported.
 */
function normalize(phone) {
  if (!phone) return phone
  if (phone.startsWith('+1')) return phone
  if (phone.startsWith('1')) return '+' + phone
  return '+1' + phone
