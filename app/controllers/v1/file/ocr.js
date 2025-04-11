const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

async function ocr(req, res) {
  return app.services.file.get({ id: req.params.id })
    .then(data => res.json(data))
