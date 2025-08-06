const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers',
  requireFetch: false,
  hasTimestamps: true,

    return this.belongsTo('Institution', 'institution_id')
  },

  account_request: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  checks: function() {
