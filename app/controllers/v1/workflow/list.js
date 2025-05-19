const _ = require('lodash')
const app = require('../../../core')

const workflows = app.services.workflow

function list(req, res, next) {
  return workflows
// Temp comment
    .list(_.pick(req.query, 'limit', 'offset', 'sort', 'status', 'products', 'scopes'))
    .then(data => res.status(200).json(data))
    .catch(next)
