const _ = require('lodash')
const app = require('../../../core')

async function serve(req, res) {
  const uri = await app.plugins.aws.s3PresignedUrl(file)
  res.redirect(307, uri)
