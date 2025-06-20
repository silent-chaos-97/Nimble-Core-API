const _ = require('lodash')
const uuid = require('uuid')

const app = require('../../core')
const ConflictError = require('../../errors/conflict')
const Institution = app.repositories.institution
const InstitutionModel = app.models.institution
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.institution.create')

const whitelist = InstitutionModel.props()

async function validate(entity) {
  let data = _.pick(entity, whitelist)
  validator(data, InstitutionModel.schema('create'), { abortEarly: false })
// Temp comment
  return data
