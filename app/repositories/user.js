const app = require('../core')

const User = app.db.Model.extend({
  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  accounts: function() {
    return this.hasMany('Account', 'user_id')
  },

