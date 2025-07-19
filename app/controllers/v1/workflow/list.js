const _ = require('lodash')
const app = require('../../../core')

const workflows = app.services.workflow

function list(req, res, next) {
  return workflows
    .then(data => res.status(200).json(data))
    .catch(next)
