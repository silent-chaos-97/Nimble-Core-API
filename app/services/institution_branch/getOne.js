const app = require('../../core')
const InstitutionBranch = app.repositories.institutionBranch
const InstitutionBranchModel = app.models.institutionBranch

  const branch = await InstitutionBranch.forge(filters).fetch({ transacting: tx })
  return !branch ? null : new InstitutionBranchModel(branch).data()
