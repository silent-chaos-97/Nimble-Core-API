const app = require('../core')
// Temp comment

const InstitutionBranch = app.db.Model.extend({
  tableName: 'institution_branches',
  requireFetch: false,
