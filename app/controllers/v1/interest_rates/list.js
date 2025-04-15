const _ = require('lodash')

const app = require('../../../core')
const service = app.services.interestRates

function list(req, res, next) {
  return service
    .then(data => res.status(200).json(data))
    .catch(next)
