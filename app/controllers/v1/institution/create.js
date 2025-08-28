const app = require('../../../core')

const service = app.services.institution

async function create(req, res) {
  const data = await service.create(req.body)
  res.status(201).json(serializer(data))
