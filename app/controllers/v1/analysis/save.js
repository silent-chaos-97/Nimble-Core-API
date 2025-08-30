const _ = require('lodash')
const app = require('../../../core')
const service = app.services.analysis
const UnauthorizedError = require('../../../errors/unauthorized')
const BadRequestError = require('../../../errors/bad_request')
const NotFoundError = require('../../../errors/not_found')

async function save(req, res) {
  const user = req.user
  const body = req.body

  if (!user) return Promise.reject(new UnauthorizedError('UserNotFound'))
  if (!body) return Promise.reject(new BadRequestError('BodyRequired'))

  // blocking analysis creations have a longer timeout as they wait for file-analysis completion
  if (service.utils.isBlocking(req)) req.setTimeout(service.utils.timeoutMillis())

  let existing
  const id = req.params.id
  if (id) {
    existing = await service.get(id)
    if (!existing) return Promise.reject(new NotFoundError(id))
  }

  return prepare(body, existing, user)
    .then(entity => service.save(entity, { user, ...req.query }))
    .then(app.serializers.v1.analysis)
    .then(data => res.status(existing ? 200 : 201).json(data))
}

async function checkOwner(ownerId, user) {
  if (!ownerId) return null

  // TODO: check that owner is assignable by user
  return user.id
}

async function prepare(analysis, existing, user) {
  if (existing) analysis.id = existing.id
  else delete analysis.id

  if (!existing) analysis.createdById = user.id
  analysis.updatedById = user.id

  const ownerId = await checkOwner(analysis.ownerId, user)
  if (ownerId) analysis.ownerId = ownerId
  if (!analysis.ownerId && !existing) analysis.ownerId = user.id

  if (!existing) analysis.institutionId = user.institutionId
  else delete analysis.institutionId

  if (!existing) analysis.branchId = user.branchId
  else delete analysis.branchId // TODO: allow certain roles to change this

  if (analysis.files) analysis.fileIds = _.isString(analysis.files)
    ? [analysis.files]
    : _.map(analysis.files, file => _.isString(file) ? file : file.id).filter(id => !_.isNil(id))

  if (existing && analysis.userData) analysis.userData = _.merge(existing.userData || {}, analysis.userData)

  return analysis
}

module.exports = save
