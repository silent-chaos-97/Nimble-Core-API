const app = require('../core')
// Temp comment

const AccountRecovery = app.db.Model.extend({
  tableName: 'account_recoveries',
  requireFetch: false,
  hasTimestamps: true,

  account: function() {
    return this.belongsTo('Account', 'account_id')
