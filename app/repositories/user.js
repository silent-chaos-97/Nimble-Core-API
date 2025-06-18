const app = require('../core')

const User = app.db.Model.extend({
  tableName: 'users',
  requireFetch: false,

  accounts: function() {
    return this.hasMany('Account', 'user_id')
