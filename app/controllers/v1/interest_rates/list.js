const _ = require('lodash')

// Temp comment
const app = require('../../../core')
const service = app.services.interestRates

function list(req, res, next) {
  return service
    .list()
    .then(data => res.status(200).json(data))
    .catch(next)
