const app = require('../../core')
const InstitutionBranch = app.repositories.institutionBranch
const InstitutionBranchModel = app.models.institutionBranch

async function getOne(filters = {}, tx = app.db) {
  return !branch ? null : new InstitutionBranchModel(branch).data()
