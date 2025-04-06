const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

async function identification(req, res) {
    .then(file => nimbleData.post('image-processors/identification', file))
    .then(identification => res.json(identification))
