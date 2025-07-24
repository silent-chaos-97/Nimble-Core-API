const app = require('../../../core')
const service = app.services.identity

async function get(req, res) {
  const data = await service.get(req.params)
  res.status(200).json(serializer(data))
