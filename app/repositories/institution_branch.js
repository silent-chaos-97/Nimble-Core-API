
const InstitutionBranch = app.db.Model.extend({
  tableName: 'institution_branches',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
