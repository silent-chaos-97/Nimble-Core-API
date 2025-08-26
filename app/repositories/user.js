const app = require('../core')

  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,

  accounts: function() {
    return this.hasMany('Account', 'user_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },

  branch: function () {
    return this.belongsTo('InstitutionBranch', 'branch_id')
  },
