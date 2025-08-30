const _ = require('lodash')
const config = require('../../config')
const postmark = require('postmark')
const aws = require('./aws')
const brevo = require('./brevo')
const Mustache = require('mustache')
const logger = require('./logger').getLogger('app.plugins.email')

function ctaHtmlButton(title, href) {
  return `<div class='primary-button' style='width: 100%; margin: 42px auto;'> <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="padding: 12px 40px;margin: 42px auto;v-text-anchor:middle;width:500px;" arcsize="118%" stroke="f" fillcolor="#62db85"> <w:anchorlock/> <center> <![endif]--><a href='${href}' style='margin: 0; width: 100%; padding: 12px 0; display: inline-block; text-align: center; background: #62db85; border-radius: 47px; color: white; position: relative; font-family: Gilroy, Helvetica, Arial, sans-serif; font-style: normal; font-weight: bold; font-size: 14px; line-height: 16px; border: none; text-decoration: none;'>${title}</a> <!--[if mso]> </center> </v:roundrect> <![endif]--> </div>`
}

class EmailService {
  constructor(service) {
    let apiKey = config.get('email').apiKey
    this.from = config.get('email').from
    this.service = new service.ServerClient(apiKey)
    this.aws = aws
    this.brevo = brevo
  }

  send(template, data) {
    if (!template) {
      throw new Error('EmailService: Missing template name')
    }

    if (!_.has(data, 'email')) {
      throw new Error('EmailService: Missing on metadata {email: ""}')
    }

    logger.debug(data, `[send] email was sent to ${data.email} with template ${template} with data`)

    return this.service.sendEmailWithTemplate({
      From: this.from,
      To: data.email,
      TemplateAlias: template,
      TemplateModel: data
    })
  }

  notify(ctx) {
    logger.info(ctx, '[email:notify]')

    const title = ctx.title ? Mustache.render(ctx.title, ctx.vars) : 'New Notification'
    let plain = Mustache.render(ctx.message, ctx.vars)
    let html = ctx.html || plain.replace(/\r\n|\r|\n/g, '<br>')

    if (ctx.cta) {
      const cta = ctx.cta
      const ctaTitle = cta.title || 'Link'
      const ctaHref = cta.link

      plain += `\n\n${ctaTitle}:\n${ctaHref}`
      html += ctaHtmlButton(ctaTitle, ctaHref)
    }

    logger.info({ title, message: plain }, '[email:notify:rendered]')

    return this.aws.sendEmailTemplate(
      'notification',
      Array.isArray(ctx.to) ? ctx.to : [ctx.to],
      Array.isArray(ctx.cc) ? ctx.cc : [ctx.cc],
      Array.isArray(ctx.bcc) ? ctx.bcc : [ctx.bcc],
      {
        title,
        html,
        plain
      }
    )
  }

  notifyBrevo(ctx) {
    logger.info(ctx, '[email:notifyBrevo]')

    return this.brevoSend(ctx.vars.brevoTemplateId, {
      email: ctx.to,
      cc: ctx.cc,
      bcc: ctx.bcc,
      ...ctx.vars
    })
  }

  awsSend(template, data) {
    if (!template) {
      throw new Error('EmailService: Missing template name')
    }

    if (!_.has(data, 'email')) {
      throw new Error('EmailService: Missing on metadata {email: ""}')
    }

    return this.aws.sendEmailTemplate(template, [data.email], [data.cc], [], data)
  }

  brevoSend(template, data) {
    if (!template) {
      throw new Error('EmailService: Missing template name')
    }

    if (!_.has(data, 'email')) {
      throw new Error('EmailService: Missing on metadata {email: ""}')
    }

    return this.brevo.sendEmailTemplate(
      template,
      Array.isArray(data.email) ? data.email : [data.email],
      Array.isArray(data.cc) ? data.cc : [data.cc],
      Array.isArray(data.bcc) ? data.bcc : [data.bcc],
      data
    )
  }

  sendEmail(data) {
    return this.aws.sendEmail(data.emails, data.ccs, data.subject, data.text)
  }

  sendPasswordRecovery(data) {
    const statusEmailSubject = 'Password Recovery'
    return this.awsSend('passwordResetEmail', { statusEmailSubject, ...data })
  }

  sendMagicLink(data) {
    const subject = `${data.institution || 'Bank'} | NimbleFi Login`
    return this.brevoSend(10, { subject, ...data })
  }

  sendAccountRequestStatus(status, data) {
    if (status === 'APPROVED') {
      return this.brevoSend(22, data)
    }

    if (status === 'DECLINED') {
      return this.brevoSend(23, data)
    }
  }
}

module.exports = new EmailService(postmark)
