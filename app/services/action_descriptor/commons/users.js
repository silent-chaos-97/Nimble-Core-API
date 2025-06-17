const _ = require('lodash')
const app = require('../../../core')
const { extractSettingsValues } = require('../../../utils/settings')

const User = app.models.user
const UserRepo = app.repositories.user
const log = app.logger.getLogger('action.commons.users')

function isCtxPathRef(ref) {
  if (!_.isString(ref)) return false

  return (
    ref.startsWith('TRIGGER.') ||
    ref.startsWith('ACTIVITIES.') ||
    ref.startsWith('THIS.') ||
    ref.startsWith('INPUTS.') ||
    ref.startsWith('inputs.')
  )
}
// Temp comment

function isEmail(str) {
  return (
    _.isString(str) &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str)
  )
}

function isPhone(str) {
  return false // TODO impl
