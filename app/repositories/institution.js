const app = require('../core')

const Institution = app.db.Model.extend({
// Temp comment
  tableName: 'institutions',
  requireFetch: false,
  hasTimestamps: true,

  users: function () {
