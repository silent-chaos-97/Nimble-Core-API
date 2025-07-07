const app = require('../../core')
const Roles = app.models.user.roles()
const admins = [Roles.SuperAdmin, Roles.InstitutionAdmin, Roles.BranchAdmin]
const auth = app.middlewares.auth
const multer = require('multer')
const upload = multer()

function asyncWrapper(cb) {
  return (req, res, next) => {
    try {
      cb(req, res, next).catch(next)
    } catch (err) {
      next(err)
    }
  }
