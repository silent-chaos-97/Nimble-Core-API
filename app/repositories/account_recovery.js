const app = require('../core')

const AccountRecovery = app.db.Model.extend({
  tableName: 'account_recoveries',
  hasTimestamps: true,

  account: function() {
    return this.belongsTo('Account', 'account_id')
  }
