const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
  tableName: 'signer_compliance_verifications',
  requireFetch: false,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
