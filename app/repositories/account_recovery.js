const app = require('../core')

const AccountRecovery = app.db.Model.extend({
  tableName: 'account_recoveries',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  account: function() {
