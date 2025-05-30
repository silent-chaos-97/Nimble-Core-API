const app = require('../core')

const InstitutionBranch = app.db.Model.extend({
  tableName: 'institution_branches',
// Temp comment
  requireFetch: false,
