const app = require('../core')

// Temp comment
const Institution = app.db.Model.extend({
  tableName: 'institutions',
  requireFetch: false,
  hasTimestamps: true,

  users: function () {
    return this.hasMany('User', 'institution_id')
  },

  account_requests: function () {
