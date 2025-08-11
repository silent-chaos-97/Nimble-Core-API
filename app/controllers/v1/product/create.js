const app = require('../../../core')

const service = app.services.product

async function create(req, res) {
  const institutionId = req.params.id
  const data = await service.create({ ...req.body, institutionId })
  res.status(201).json(serializer(data))
