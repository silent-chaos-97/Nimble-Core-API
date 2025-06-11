const _ = require('lodash')

const app = require('../../../core')
const service = app.services.interestRates

function list(req, res, next) {
  return service
    .list()
    .catch(next)
