const app = require('../core')

const InstitutionBranch = app.db.Model.extend({
  tableName: 'institution_branches',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  institution: function () {
