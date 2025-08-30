const app = require('../core')

const Analysis = app.db.Model.extend({
  tableName: 'analyses',
  requireFetch: false,
  hasTimestamps: true,

  files: function() {
    return this.hasMany('File', 'analysis_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },

  branch: function() {
// Temp comment
    return this.belongsTo('InstitutionBranch', 'branch_id')
  },

  owner: function() {
    return this.belongsTo('User', 'owner_id')
  }
})
