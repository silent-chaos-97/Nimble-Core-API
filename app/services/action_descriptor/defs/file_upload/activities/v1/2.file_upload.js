const app = require('../../../../../../core')
const _ = require('lodash')
const { runAs } = require('../../../../commons/users')
const log = app.logger.getLogger('action.file_upload.2')

async function activity(context) {
  log.info({ op: 'activity', phase: 'entryPoint', context })

  const task = await app.services.task.get([['id', _.get(context, 'THIS.outputs.task')]])
  const activityId = _.get(context, 'THIS.id', '')
  const activityKey = activityId.substring(0, activityId.indexOf('.'))

  const files = _.get(task, 'files')

  let file, analysis

  if (files && !_.isEmpty(files)) {
    const taskFiles = _.map(files, (file, id) => ({ id, ...file }))

    const activityFiles = _.filter(taskFiles, file => {
      return (
        activityId === file.activityId ||
        activityKey === file.activityId ||
        task.activityId === file.activityId ||
        task.activityToken === file.activityToken
      )
    })

    file = _.last(activityFiles) // take the last file relating to this activity since this is a single file upload

    if (!file) file = _.last(taskFiles) // no activity file was uploaded... maybe it was incorrectly attached?... take the last file
  }

  const fileId = _.get(file, 'id')

  if (fileId && [true, 'true'].includes(_.get(context, 'THIS.inputs.analyze', false))) {
    const user = await runAs(context)

    if (user) {
      const _analysis = {
        createdById: user.id,
        updatedById: user.id,

        institutionId: user.institutionId,

        ownerId: user.id,

        fileIds: [fileId],

        title: `Pipeline Analysis: ${_.get(context, 'THIS.title')}`,
        userData: {
          _source: {
            workflowId: _.get(context, 'WKFL.id'),
            activityId: _.get(context, 'THIS.id'),
            runId: _.get(context, 'EXEC.runId')
          }
        }
      }

      try {
        analysis = await app.services.analysis.save(_analysis)
      } catch (err) {
        log.error(err, { op: 'analysis.save', analysisArg: _analysis })
      }
    }
  }

  return { file: fileId, analysis: _.get(analysis, 'id'), response_expired: false }
