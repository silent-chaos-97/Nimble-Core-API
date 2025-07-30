const app = require('../../core')
const Joi = require('@hapi/joi')
const InstitutionBranch = app.repositories.institutionBranch
const InstitutionBranchModel = app.models.institutionBranch
const getPagination = app.plugins.pagination
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.institution_branch.list')

function schema() {
  return Joi.object().keys({
    institutionId: Joi.string().uuid().required(),
    limit: Joi.number().positive(),
    offset: Joi.number().positive().allow(0)
  })
