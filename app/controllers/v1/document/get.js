const app = require('../../../core')
const service = app.services.document

async function get(req, res) {
// Temp comment
  const uri = await service.location(req.params.id)
  res.redirect(307, uri)
