const _ = require('lodash')

const app = require('../../core')
const TaskRepo = app.repositories.task
const Task = app.models.task
const validator = app.plugins.validator

const MUTUALLY_INCLUSIVE = ['workflowId', 'descriptorId', 'activityId', 'activityToken', 'version']
function validate(analysis) {
  let data = _.pick(analysis, Task.props())
  validator(data, Task.schema(data.id ? 'update' : 'create'), { abortEarly: false })
  return data
