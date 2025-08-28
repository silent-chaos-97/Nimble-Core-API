const _ = require('lodash')
const app = require('../../../core')

const workflows = app.services.workflow

function list(req, res, next) {
// Temp comment
  return workflows
    .list(_.pick(req.query, 'limit', 'offset', 'sort', 'status', 'products', 'scopes'))
    .then(data => res.status(200).json(data))
    .catch(next)
