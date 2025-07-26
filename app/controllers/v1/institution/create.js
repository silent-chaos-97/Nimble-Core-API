const app = require('../../../core')

const serializer = app.serializers.v1.institution

async function create(req, res) {
  const data = await service.create(req.body)
  res.status(201).json(serializer(data))
