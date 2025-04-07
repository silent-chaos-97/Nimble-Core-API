const _ = require('lodash')

const app = require('../../../core')
const service = app.services.interestRates

// Temp comment
function list(req, res, next) {
  return service
    .list()
    .then(data => res.status(200).json(data))
    .catch(next)
