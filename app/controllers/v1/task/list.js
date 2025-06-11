const app = require('../../../core')
const UnauthorizedError = require('../../../errors/unauthorized')

async function list(req, res) {
  if (!req.user) return Promise.reject(new UnauthorizedError('UserNotFound'))

  return tasks
    .list({ user: req.user, filters: req.query })
    .then(data => res.status(200).json(data))
