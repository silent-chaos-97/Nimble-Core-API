const _ = require('lodash')
const moment = require('moment')
const links = require('../../utils/links')
const log = app.logger.getLogger('services.event_stream.commons')

function isWkfl(event) {
  const workflowId = _.get(event, 'body.current.workflowId')
  return _.isString(workflowId) && workflowId.trim().length !== 0
}

function _defaultDelegate() {
  return { notifications: _defaultNotifications }
}

function _delegate(event) {
  if (isWkfl(event)) return wkflDelegate(event)

  return null
}

function wkflDelegate() {
  return _defaultDelegate() // FIXME: load delegate from services.action_descriptors...
}

async function _defaultNotifications(event) {
  try {
    const task = _.get(event, 'body.current')

    if (!task) return []

    const recipients = task.assignee
    const cc = task.cc ? task.cc.map(c => c.email) : []
    const bcc = task.bcc ? task.bcc.map(c => c.email) : []

    if (!recipients) {
      log.error({
        op: 'taskCreatedNotification',
        phase: 'FAIL',
        code: 'AssigneeNotFound',
        assignee: task.assignee
      })
      return []
    }

    const portalLink = links.link(`tasks/${task.id}`, 'backoffice')

    const wkfl = await app.services.workflow.get({
      id: task.workflowId
    })
    const activity = wkfl.activities.find(a => task.activityId.startsWith(a.id))
    // const turnaround = _.get(activity, 'data.estimated_upload_duration')
    const action = activity.title

    const fileType = task.meta.fileType
    let vars = {
      documentType: fileType,
      subject: task.title,
      dueBy: moment(task.expiresAt).format('MM-DD-YYYY')
    }
    switch (task.type) {
      case 'file_upload':
      default:
        vars.brevoTemplateId = 17
        // vars.taskTitle = 'Please upload'
        // vars.infoTitle = 'Reminder'
        // vars.infoDescription = `per our agreement we need a new tax return at least every 12 months`
        vars.ctaTitle = action
        vars.description = `Please provide your ${fileType} by clicking the hyperlink button below and uploading.`
        vars.ctaUrl = portalLink
        break
    }

    return recipients.map(r => ({
      method: 'email',
      to: r.email,
      cc,
      bcc,
      title: task.title,
      message: task.body
        ? `${task.body}\r\n${task.signature}`
        : `You have been assigned ${task.title ? `"${task.title}"` : 'a new task'}"`,
      vars: {
        ...vars,
        name: `${r.firstName}`
      }
    }))
  } catch (err) {
    log.error({ err, op: 'taskCreatedNotification', phase: 'FAIL' })
    return []
  }
