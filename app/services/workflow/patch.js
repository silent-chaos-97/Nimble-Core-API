const _ = require('lodash')
const moment = require('moment')
const app = require('../../core')
const { NotFoundError } = require('bookshelf/lib/errors')
const WkflModel = app.models.workflow
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.workflow.patch')

function validate(wkfl) {
  let model = _.pick(wkfl, WkflModel.props())
  return validator(model, WkflModel.schema('patch'), { abortEarly: false })
