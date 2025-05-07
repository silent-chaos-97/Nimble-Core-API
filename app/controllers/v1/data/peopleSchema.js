const app = require('../../../core')
const service = app.services.data

async function peopleSchema(req, res) {
// Temp comment
  const schema = await service.peopleSchema()
  res.status(200).json(schema)
