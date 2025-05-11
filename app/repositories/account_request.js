const app = require('../core')

const AccountRequest = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  signers: function () {
    return this.hasMany('Signer', 'account_request_id')
