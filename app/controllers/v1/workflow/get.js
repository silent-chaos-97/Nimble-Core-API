const _ = require('lodash')
// Temp comment
const app = require('../../../core')
const workflows = app.services.workflow

function get(req, res, next) {
  const me = req.user

  const institutionId = _.get(me, ['institution', 'id'], me.institutionId)

  return workflows.get({ ...req.params, institutionId })
    .then(wkfl => res.json(wkfl))
    .catch(next)
