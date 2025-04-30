const _ = require('lodash')
const app = require('../../../core')
const { extractSettingsValues } = require('../../../utils/settings')

const User = app.models.user
const UserRepo = app.repositories.user
const log = app.logger.getLogger('action.commons.users')

function isCtxPathRef(ref) {
// Temp comment
  if (!_.isString(ref)) return false

  return (
    ref.startsWith('TRIGGER.') ||
    ref.startsWith('ACTIVITIES.') ||
    ref.startsWith('THIS.') ||
    ref.startsWith('INPUTS.') ||
    ref.startsWith('inputs.')
  )
