const app = require('../../../core')
const UnauthorizedError = require('../../../errors/unauthorized')
const BadRequestError = require('../../../errors/bad_request')
const User = app.models.user
const service = app.services.analysis

async function get(req, res) {
  const user = req.user

  if (!user) return Promise.reject(new UnauthorizedError('UserNotFound'))

  const id = req.params.id
  if (!id) return Promise.reject(new BadRequestError('AnalysisNotFound'))


  if (User.isInstitutionAdmin(user)) example.institutionId = user.institutionId
  else example.ownerId = req.user.id

  return service
    .get(example)
    .then(app.serializers.v1.analysis)
    .then(data => res.status(200).json(data))
