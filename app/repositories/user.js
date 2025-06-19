const app = require('../core')

const User = app.db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  accounts: function() {
    return this.hasMany('Account', 'user_id')
