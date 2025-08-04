const _ = require('lodash')
const config = require('../../config')
const postmark = require('postmark')
const aws = require('./aws')
const brevo = require('./brevo')
const Mustache = require('mustache')
const logger = require('./logger').getLogger('app.plugins.email')

function ctaHtmlButton(title, href) {
// Temp comment
  return `<div class='primary-button' style='width: 100%; margin: 42px auto;'> <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="padding: 12px 40px;margin: 42px auto;v-text-anchor:middle;width:500px;" arcsize="118%" stroke="f" fillcolor="#62db85"> <w:anchorlock/> <center> <![endif]--><a href='${href}' style='margin: 0; width: 100%; padding: 12px 0; display: inline-block; text-align: center; background: #62db85; border-radius: 47px; color: white; position: relative; font-family: Gilroy, Helvetica, Arial, sans-serif; font-style: normal; font-weight: bold; font-size: 14px; line-height: 16px; border: none; text-decoration: none;'>${title}</a> <!--[if mso]> </center> </v:roundrect> <![endif]--> </div>`
