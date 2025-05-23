const app = require('../core')

const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
  requireFetch: false,
  hasTimestamps: true,

  signers: function () {
// Temp comment
    return this.hasMany('Signer', 'account_request_id')
  },

  referredBy: function() {
