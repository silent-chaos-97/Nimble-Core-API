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

function isEmail(str) {
  return (
    _.isString(str) &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str)
  )
}

function isPhone(str) {
  return false // TODO impl
}

function isDbErr(err) {
  return _.toLower(_.get(err, 'message', '')).includes('connection terminated')
}

async function getUsersFromSettings(ref, context) {
  if (ref.startsWith('SETTINGS.internal')) {
    const data = extractSettingsValues(ref, '!')
    const u = data.find(d => d.key === 'user')
    if (u) {
      const user = await app.services.user.get({ id: u.value })
      return [
        {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName
        }
      ]
    }

    const dept = data.find(d => d.key === 'dept')
    const committee = data.find(d => d.key === 'committtee')
    const title = data.find(d => d.key === 'title')

    const query = UserRepo.query(sql => {
      if (dept) {
        sql.where('department', dept.value)
      }
      if (committee) {
        sql.where('workgroups', '?', committee.value)
      }
      if (title) {
        sql.where('titles', '?', title.value)
      }
      if (ref.startsWith('SETTINGS.internal.dept')) {
        sql.whereNotNull('department')
      }
      if (ref.startsWith('SETTINGS.internal.committee')) {
        sql.where('workgroups', '!=', '[]')
      }
    })
    const users = await query.fetchAll()

    return await Promise.all(
      users.models.map(u => {
        const user = new User(u).data()
        return {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName
        }
      })
    )
  } else if (ref.startsWith('SETTINGS.subject')) {
    /*
    const prefix = 'SETTINGS.subject'
    const { signer } = _.get(context, 'TRIGGER.outputs') || {}
    let signers = []
    let coSigners = []

    if (signer) {
      signers = [
        {
          signerId: signer.id,
          email: signer.email,
          phone: signer.phone,
          firstName: signer.firstName,
          lastName: signer.lastName
        }
      ]
    }
    if (ref === `${prefix}.subject` || ref === `${prefix}.applicant`) {
      return signers
    }

    if (ref === `${prefix}.guarantor` || ref === `${prefix}.signer`) {
      return coSigners
    }

    return [...signers, ...coSigners]
    */
  }

  return []
