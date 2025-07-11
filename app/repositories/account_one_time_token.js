const app = require('../core')

const AccountOneTimeToken = app.db.Model.extend({
  tableName: 'account_one_time_tokens',
  requireFetch: false,

