const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')

const getPagination = app.plugins.pagination
const validator = app.plugins.validator

const SignerCreditReport = app.repositories.signerCreditReport
const SignerCreditReportModel = app.models.signerCreditReport

const listSchema = Joi.object().keys({
  signerId: Joi.string().uuid().required(),
  sort: Joi.string().valid('updated_at', '-updated_at').default('updated_at'),
  limit: Joi.number().positive(),
  offset: Joi.number().positive().allow(0),
})

const sortBy = {
  updated_at: 'signer_credit_reports.updated_at ASC',
  '-updated_at': 'signer_credit_reports.updated_at DESC',
}

async function validate(params) {
  return validator(params, listSchema, { abortEarly: false })
}

function getSqlSort(sort) {
  return _.get(sortBy, sort, sortBy['-updated_at'])
