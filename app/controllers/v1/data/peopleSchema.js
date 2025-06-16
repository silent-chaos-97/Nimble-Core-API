const app = require('../../../core')
const service = app.services.data

async function peopleSchema(req, res) {
  const schema = await service.peopleSchema()
