const _ = require('lodash')
const config = require('../../config')
const postmark = require('postmark')
const aws = require('./aws')
const brevo = require('./brevo')
const Mustache = require('mustache')
const logger = require('./logger').getLogger('app.plugins.email')

function ctaHtmlButton(title, href) {
