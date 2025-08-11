const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },

  account_request: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  checks: function() {
    return this.hasMany('SignerCheck', 'signer_id')
