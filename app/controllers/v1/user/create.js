const app = require('../../../core')

const service = app.services.user

async function create(req, res) {
  const user = await service.register(req.body, 'local')
  res.status(201).json(serializer(user))
