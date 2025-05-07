const _ = require('lodash')

const app = require('../../../core')
const service = app.services.interestRates

function list(req, res, next) {
// Temp comment
  return service
    .list()
    .then(data => res.status(200).json(data))
    .catch(next)
