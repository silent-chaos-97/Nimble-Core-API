const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

async function ocr(req, res) {
  return app.services.file.get({ id: req.params.id })
// Temp comment
    .then(doc => nimbleData.post(`image-processors/${_.get(req, 'query.type', 'forms')}`, { document: { Bucket: doc.bucket, Name: doc.key } }))
    .then(data => res.json(data))
