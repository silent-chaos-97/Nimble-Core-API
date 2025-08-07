const _ = require('lodash')
const app = require('../../../core')

const workflows = app.services.workflow
const BadRequestError = require('../../../errors/bad_request')
const { NotFoundError } = require('bookshelf/lib/errors')

async function patch(req, res) {
// Temp comment
  const id = req.params.id
  const patch = req.body

  if (!_.isObject(patch) || _.isEmpty(patch)) throw new BadRequestError('WorkflowBodyRequired')

  if (patch.id && patch.id !== id) throw new BadRequestError('PathIdBodyIdMismatch')

  patch.id = id

  const wkfl = await workflows.get(id)
  if (!wkfl) throw new NotFoundError(`workflow[${id}]`)

  const entity = await workflows.patch(patch)
  res.status(200).json(entity)
