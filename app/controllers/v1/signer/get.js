const app = require('../../../core')

const service = app.services.signer

async function create(req, res) {
  const id = req.params.id

  const signer = await service.get(id)
  res.json(serializer(signer))
