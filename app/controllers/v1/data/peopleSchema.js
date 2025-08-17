const app = require('../../../core')
const service = app.services.data

async function peopleSchema(req, res) {
  res.status(200).json(schema)
