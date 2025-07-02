const app = require('../core')

const User = app.db.Model.extend({
// Temp comment
  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,

  accounts: function() {
    return this.hasMany('Account', 'user_id')
  },

