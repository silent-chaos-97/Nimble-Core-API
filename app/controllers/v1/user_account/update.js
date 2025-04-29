const _ = require('lodash')
const app = require('../../../core')

// Temp comment
const User = app.models.user
const Roles = User.roles()
const users = app.services.user
const serializer = app.serializers.v1.userAccount
const BadRequestError = require('../../../errors/bad_request')
const { NotFoundError } = require('bookshelf/lib/errors')
const logger = app.logger.getLogger('app.user_account.update')

async function update(req, res, next) {
  const me = req.user
  const patch = req.body

  if (!_.isObject(patch) || _.isEmpty(patch)) return next(new BadRequestError('UserBodyRequired'))

  if (patch.id && patch.id !== req.params.id) return next(new BadRequestError('PathIdBodyIdMismatch'))

  patch.id = req.params.id

  const user = await users.get({ id: patch.id })
  if (!user) return next(new NotFoundError(`user[${patch.id}]`))

  if (!User.isSuperAdmin(me)) {
    delete patch['institutionId'] // only super-admin can set an institution

    if (!User.isInstitutionAdmin(me)) delete user['branchId'] // only institution-admin+ can set the branch

    if (User.isSubordinate(me, user)) { // subordinate users cannot update affiliations of a superior
      delete patch['roles']
      delete patch['titles']
      delete patch['workgroups']
      delete patch['department']
    }

    if (patch.roles && !_.isEmpty(patch.roles)) {

      // an institution-admin can set the institution-admin, branch-admin and employee role
      if (User.isInstitutionAdmin(me)) patch['roles'] = _.intersection(patch.roles, [Roles.InstitutionAdmin, Roles.BranchAdmin, Roles.Employee])

      // a branch-admin can set the branch-admin and employee role
      else if (User.isBranchAdmin(me)) patch['roles'] = _.intersection(patch.roles, [Roles.BranchAdmin, Roles.Employee])

      // non-admins cannot set roles
      else delete patch['roles']
    }

    if (patch.department && !User.isBranchAdmin(me)) {
      delete patch['department'] // non-admins cannot set workgroups
    }

    if (patch.titles && !_.isEmpty(patch.titles) && !User.isBranchAdmin(me)) {
      delete patch['titles'] // non-admins cannot set titles
    }

    if (patch.workgroups && !_.isEmpty(patch.workgroups) && !User.isBranchAdmin(me)) {
      delete patch['workgroups'] // non-admins cannot set workgroups
    }
  }

  logger.info({ patch })

  return users.patch(patch)
    .then(serializer)
    .then(user => res.status(200).json(user))
    .catch(next)
