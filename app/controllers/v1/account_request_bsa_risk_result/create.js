const app = require('../../../core')

const service = app.services.bsaRiskResult

async function create(req, res) {
  const accountRequestId = req.params.id
  const data = await service.create(req.body, accountRequestId)
  res.status(201).json(data.map(serializer))
