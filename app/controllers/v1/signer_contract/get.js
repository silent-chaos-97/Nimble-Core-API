const app = require('../../../core')

const service = app.services.contract

async function get(req, res) {
  const signerId = req.params.id
  const data = await service.embed(signerId)
  res.status(200).json(serializer(data))
