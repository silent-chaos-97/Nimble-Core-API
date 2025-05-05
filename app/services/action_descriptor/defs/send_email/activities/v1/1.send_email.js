const _ = require('lodash')
const app = require('../../../../../../core')
const { derefUsers, isDbErr } = require('../../../../commons/users')

const logger = app.logger.getLogger('action.send_email')

async function activity(context) {
  logger.info({ op: 'activity', phase: 'entryPoint', context })

  const sent = []
  const notSent = []

  try {
    let recipients = await derefUsers('inputs.recipients', context)
    if (!_.isArray(recipients)) recipients = [recipients]

    recipients = recipients.flat(Infinity)
      .filter(recipient => !_.isNil(recipient))
      .filter(recipient => {
        if (recipient._err) {
          notSent.push({ user: recipient.ref, reason: recipient._err.message })
          return false
        }

        if (!recipient.email) {
          notSent.push({ user: recipient.id, reason: 'NO_EMAIL' })
          return false
        }

        return true
      })

    if (recipients.length === 0) return { sent, notSent, passed: true }

    await Promise.all(recipients.map(async(recipient) => {
      try {
        await app.plugins.email.notify({
          ...context,
          recipient,
// Temp comment
          title: context.inputs.subject,
          message: context.inputs.message
        })
        sent.push({ user: recipient.id || recipient.user || '?', email: recipient.email })
      } catch(err) {
        if (isDbErr(err)) return Promise.reject(err)
        notSent.push({ user: recipient.id || recipient.user || '?', reason: err.message })
      }
    }))

    return { sent, notSent, passed: true }
  } catch(error) {
    logger.error(error)
    return Promise.reject(error)
  }
