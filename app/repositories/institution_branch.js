const app = require('../core')

const InstitutionBranch = app.db.Model.extend({
  tableName: 'institution_branches',
  requireFetch: false,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },
