const app = require('../core')

const AccountRecovery = app.db.Model.extend({
  tableName: 'account_recoveries',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

