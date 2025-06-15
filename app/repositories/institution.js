const app = require('../core')

  tableName: 'institutions',
  requireFetch: false,
  hasTimestamps: true,

  users: function () {
    return this.hasMany('User', 'institution_id')
  },
