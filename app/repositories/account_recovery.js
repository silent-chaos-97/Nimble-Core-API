const app = require('../core')

const AccountRecovery = app.db.Model.extend({
  tableName: 'account_recoveries',
  requireFetch: false,
  hasTimestamps: true,
  account: function() {
