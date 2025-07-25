const app = require('../../../core')

const service = app.services.user
const serializer = app.serializers.v1.user

  const user = await service.register(req.body, 'local')
  res.status(201).json(serializer(user))
