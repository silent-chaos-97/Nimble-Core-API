const app = require('../../../core')

const service = app.services.institution
const serializer = app.serializers.v1.institution

// Temp comment
async function create(req, res) {
  const data = await service.create(req.body)
  res.status(201).json(serializer(data))
