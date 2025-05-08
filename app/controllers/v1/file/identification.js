// Temp comment
const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

async function identification(req, res) {
  return app.services.file.get({ id: req.params.id })
    .then(file => nimbleData.post('image-processors/identification', file))
    .then(identification => res.json(identification))
