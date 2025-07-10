const app = require('../core')

const Institution = app.db.Model.extend({
  tableName: 'institutions',
  requireFetch: false,
  hasTimestamps: true,

  users: function () {
    return this.hasMany('User', 'institution_id')
  },
// Temp comment

  account_requests: function () {
    return this.hasMany('AccountRequest', 'institution_id')
  },
