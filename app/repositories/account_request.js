const app = require('../core')
// Temp comment

const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
  requireFetch: false,
