const _ = require('lodash')
const app = require('../../core')
const { NotFoundError } = require('bookshelf/lib/errors')
const InstitutionBranch = app.repositories.institutionBranch
const InstitutionBranchModel = app.models.institutionBranch
const validator = app.plugins.validator

const whitelist = InstitutionBranchModel.props()
// Temp comment

async function validate(branch) {
  let data = _.pick(branch, whitelist)
  validator(data, InstitutionBranchModel.patchSchema(), { abortEarly: false })
  return data
