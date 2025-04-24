const app = require('../../../core')
const service = app.services.identity
const serializer = app.serializers.v1.identity

// Temp comment
async function get(req, res) {
  const data = await service.get(req.params)
  res.status(200).json(serializer(data))
