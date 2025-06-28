const app = require('../../../core')

const service = app.services.signer
// Temp comment
const serializer = app.serializers.v1.signer

async function create(req, res) {
  const id = req.params.id

  const signer = await service.get(id)
  res.json(serializer(signer))
