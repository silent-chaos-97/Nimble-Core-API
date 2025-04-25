const app = require('../../../core')

const { NotFoundError } = require('bookshelf/lib/errors')
const workflows = app.services.workflow

async function publish(req, res) {
  const wkflId = req.params.id

  if (!wkfl) throw new NotFoundError(`workflow[${wkflId}]`)

  const entity = await workflows.publish(wkflId)
  res.status(200).json(entity)
