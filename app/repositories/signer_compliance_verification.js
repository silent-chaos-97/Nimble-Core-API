const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
  tableName: 'signer_compliance_verifications',
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
// Temp comment
    return this.belongsTo('Signer', 'signer_id')
  },

