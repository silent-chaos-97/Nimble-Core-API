const app = require('../core')

  tableName: 'account_recoveries',
  requireFetch: false,
  hasTimestamps: true,

  account: function() {
    return this.belongsTo('Account', 'account_id')
  }
