const app = require('../core')

  tableName: 'signer_compliance_verifications',
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },

  results: function() {
