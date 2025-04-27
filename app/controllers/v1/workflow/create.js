const _ = require('lodash')
const app = require('../../../core')

const Wkfl = app.models.workflow
const workflows = app.services.workflow
const BadRequestError = require('../../../errors/bad_request')

function create(req, res, next) {
  const me = req.user
  const wkfl = req.body

  if (!_.isObject(wkfl)) throw new BadRequestError('WorkflowBodyRequired')

  wkfl.userId = me.id
  wkfl.branchId = _.get(me, ['branch', 'id'], me.branchId)
  wkfl.institutionId = _.get(me, ['institution', 'id'], me.institutionId)
  if (!wkfl.status) wkfl.status = Wkfl.statuses().Draft
  if (!wkfl.activities || _.isEmpty(wkfl.activities)) wkfl.activities = []
  return workflows.create(wkfl)
    .then(entity => res.status(201).json(entity))
    .catch(next)
