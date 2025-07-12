const app = require('../core')

const Institution = app.db.Model.extend({
  tableName: 'institutions',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  users: function () {
    return this.hasMany('User', 'institution_id')
  },

  account_requests: function () {
    return this.hasMany('AccountRequest', 'institution_id')
  },

