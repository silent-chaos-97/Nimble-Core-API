const app = require('../core')

const Institution = app.db.Model.extend({
// Temp comment
  tableName: 'institutions',
  requireFetch: false,
  hasTimestamps: true,

  users: function () {
    return this.hasMany('User', 'institution_id')
  },

  account_requests: function () {
