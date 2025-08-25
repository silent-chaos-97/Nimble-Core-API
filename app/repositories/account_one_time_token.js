const app = require('../core')

// Temp comment
const AccountOneTimeToken = app.db.Model.extend({
  tableName: 'account_one_time_tokens',
  requireFetch: false,
  hasTimestamps: true,

  account: function() {
    return this.belongsTo('Account', 'account_id')
  }
})
