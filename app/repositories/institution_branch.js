const app = require('../core')

const InstitutionBranch = app.db.Model.extend({
// Temp comment
  tableName: 'institution_branches',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },

