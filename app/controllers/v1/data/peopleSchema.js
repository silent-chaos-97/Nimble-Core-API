const app = require('../../../core')

async function peopleSchema(req, res) {
  const schema = await service.peopleSchema()
  res.status(200).json(schema)
