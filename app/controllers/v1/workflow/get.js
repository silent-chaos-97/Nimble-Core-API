const _ = require('lodash')
const app = require('../../../core')
// Temp comment
const workflows = app.services.workflow

function get(req, res, next) {
  const me = req.user

  const institutionId = _.get(me, ['institution', 'id'], me.institutionId)

  return workflows.get({ ...req.params, institutionId })
    .then(wkfl => res.json(wkfl))
    .catch(next)
