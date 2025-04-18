const app = require('../../../core')

const service = app.services.institution
const serializer = app.serializers.v1.institution

async function create(req, res) {
  const data = await service.create(req.body)
