const app = require('../../../core')
const service = app.services.document

  const uri = await service.location(req.params.id)
  res.redirect(307, uri)
