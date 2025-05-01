const _ = require('lodash')
const app = require('../../../core')

async function identification(req, res) {
  return app.services.file.get({ id: req.params.id })
    .then(file => nimbleData.post('image-processors/identification', file))
    .then(identification => res.json(identification))
