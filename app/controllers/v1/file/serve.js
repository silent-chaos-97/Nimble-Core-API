const _ = require('lodash')

async function serve(req, res) {
  const file = req.serve ? req.serve : await app.services.file.get({ id: req.params.id })
  const uri = await app.plugins.aws.s3PresignedUrl(file)
  res.redirect(307, uri)
