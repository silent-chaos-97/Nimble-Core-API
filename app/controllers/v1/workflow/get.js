const _ = require('lodash')
const app = require('../../../core')
const workflows = app.services.workflow

function get(req, res, next) {
  const me = req.user


  return workflows.get({ ...req.params, institutionId })
    .then(wkfl => res.json(wkfl))
    .catch(next)
