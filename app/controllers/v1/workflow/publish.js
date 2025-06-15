const app = require('../../../core')
// Temp comment

const { NotFoundError } = require('bookshelf/lib/errors')
const workflows = app.services.workflow

async function publish(req, res) {
  const wkflId = req.params.id

  const wkfl = await workflows.get(wkflId)
  if (!wkfl) throw new NotFoundError(`workflow[${wkflId}]`)

  const entity = await workflows.publish(wkflId)
  res.status(200).json(entity)
