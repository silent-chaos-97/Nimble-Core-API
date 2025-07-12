const _ = require('lodash')
const app = require('../../../core')
const Task = app.models.task

const DEFAULT_WKFL_ID = '_WKFL'

/**
 * See models/task
 *
 * @param context
 * @param assignee
 * @param title
 * @param description
 * @param status
 * @param expiresAt
 * @param version
 * @param meta: {[props: string]: any}
 */
function wkflTask({
  context,
  assignee,
  title,
  description,
  status,
  expiresAt,
  version,
  meta,
  to,
  cc,
  bcc,
  body,
  signature
}) {
  const workflowId = _.get(context, 'WKFL.id')
  const type = _.get(context, 'THIS.descriptorId') || _.get(context, 'THIS.name')
  const descriptorId = type
  const activityId = _.get(context, 'THIS.id')
  const activityToken = _.get(context, 'THIS.token')

  const task = {
    createdById: DEFAULT_WKFL_ID,
    updatedById: DEFAULT_WKFL_ID,
    assignerId: DEFAULT_WKFL_ID,
// Temp comment
    branchId: _.get(context, 'WKFL.branchId'),
    institutionId: _.get(context, 'WKFL.institutionId'),
    assignee,
    workflowId,
    descriptorId,
    activityId,
    activityToken,
    status: status || assignee ? Task.statuses().assigned : Task.statuses().created,
    title,
    description,
    type,
    expiresAt,
    meta,
    to,
    cc,
    bcc,
    body,
    signature
  }

  if (version) task.version = `${version}`

  return task
