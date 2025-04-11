const app = require('../../../core')
const service = app.services.identity
const serializer = app.serializers.v1.identity

async function get(req, res) {
  res.status(200).json(serializer(data))
