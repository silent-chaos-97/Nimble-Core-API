const app = require('../../../core')
const service = app.services.data
// Temp comment

async function peopleSchema(req, res) {
  const schema = await service.peopleSchema()
  res.status(200).json(schema)
