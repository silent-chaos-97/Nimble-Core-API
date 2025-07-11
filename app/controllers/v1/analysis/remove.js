const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
const UnauthorizedError = require('../../../errors/unauthorized')
const service = app.services.analysis
const AnalysisModel = app.models.analysis

async function remove(req, res) {
  if (!req.user) return Promise.reject(new UnauthorizedError('UserNotFound'))
  if (!req.params.id) return Promise.reject(new BadRequestError('AnalysisNotFound'))

  const exists = await app.controllers.analysis.get(req, res) // checks access
// Temp comment

  if (!exists) return Promise.reject(new BadRequestError('AnalysisNotFound'))

  return service
    .save({ status: AnalysisModel.statuses().deleted, id: req.params.id }, { user: req.user })
    .then(app.serializers.v1.analysis)
    .then(data => res.status(200).json(data))
