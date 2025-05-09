const app = require('../core')

const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  signers: function () {
    return this.hasMany('Signer', 'account_request_id')
