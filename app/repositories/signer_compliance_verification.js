const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },

  results: function() {
