const app = require('../core')

  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User', 'user_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },

  branch: function () {
    return this.belongsTo('InstitutionBranch', 'branch_id')
