const _ = require('lodash')
const moment = require('moment')

const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.workflow.create')

function validate(wkfl) {
  let data = _.pick(wkfl, WkflModel.props())
  return validator(data, WkflModel.schema('create'), { abortEarly: false })
