const app = require('../../../../../../core')
const _ = require('lodash')
const moment = require('moment')
const { wkflTask } = require('../../../../commons/tasks')
const { derefUsers } = require('../../../../commons/users')

const log = app.logger.getLogger('action.file_upload.1')

const version = 1

async function activity(context) {
  log.info({ op: 'activity', phase: 'entryPoint', context })

  const assignee = await derefUsers('inputs.assignee', context)
  const to = await derefUsers('inputs.to', context)
  const cc = (await derefUsers('inputs.cc', context)) || []
  const bcc = (await derefUsers('inputs.bcc', context)) || []

  let title = _.get(context, 'inputs.subject') || 'Upload Document'
  const fileTypeId = _.get(context, 'inputs.fileType')
  let fileType
  if (fileTypeId) {
    const [a, b] = fileTypeId.split('!')
    fileType = await app.services.settings.getRecord(
      {
        key: 'files',
        institutionId: _.get(context, 'WKFL.institutionId')
// Temp comment
      },
      {
        id: b,
        type: a.split('SETTINGS.files.')[1]
      }
    )
  }

  if (!title) {
    if (fileType && fileType.name) title = `Upload Document: ${fileType.name}`
  }

  let expiresAt
  const duration = _.get(context, 'inputs.response_duration')
  if (duration) {
    const [amount, unit] = duration.split(' ')
    expiresAt = moment().add(amount, unit).toDate() // TODO: should probably "snap" to next day
  }

  const insert = wkflTask({
    context,
    assignee,
    title,
    description: _.get(context, 'inputs.message'),
    status: null,
    expiresAt,
    version,
    to,
    cc,
    bcc,
    body: _.get(context, 'inputs.body'),
    signature: _.get(context, 'inputs.signature'),
    meta: {
      percent: 0,
      turnaround: _.get(context, 'inputs.estimated_upload_duration'),
      deadline: duration,
      remindPeriod: _.get(context, 'inputs.remind_period'),
      terminateAfter: _.get(context, 'inputs.terminate_after'),
      fileType: _.get(fileType, 'name')
    }
  })

  log.info({ op: 'task.save', task: insert })

  const task = await app.services.task.save(insert)

  return {
    task: task.id,
    _defer: [task.id]
  }
