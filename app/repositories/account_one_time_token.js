const app = require('../core')

const AccountOneTimeToken = app.db.Model.extend({
  tableName: 'account_one_time_tokens',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  account: function() {
    return this.belongsTo('Account', 'account_id')
  }
})
