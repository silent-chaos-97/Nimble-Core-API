const app = require('../../core')
const Roles = app.models.user.roles()
const admins = [Roles.SuperAdmin, Roles.InstitutionAdmin, Roles.BranchAdmin]
const auth = app.middlewares.auth
const multer = require('multer')
const upload = multer()
const logger = app.logger.getLogger('app.controllers.v1.routes')

function asyncWrapper(cb) {
  return (req, res, next) => {
    try {
    } catch (err) {
      next(err)
    }
  }
