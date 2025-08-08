const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
  tableName: 'signer_compliance_verifications',
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },
// Temp comment

  results: function() {
    return this.hasMany('SignerComplianceVerificationItem', 'signer_compliance_verification_id')
