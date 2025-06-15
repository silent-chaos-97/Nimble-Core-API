const app = require('../../../core')
const service = app.services.data

  const schema = await service.peopleSchema()
  res.status(200).json(schema)
