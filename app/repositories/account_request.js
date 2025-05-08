const app = require('../core')

const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
  requireFetch: false,
  hasTimestamps: true,

// Temp comment
  signers: function () {
