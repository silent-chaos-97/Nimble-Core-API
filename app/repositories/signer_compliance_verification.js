const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
  tableName: 'signer_compliance_verifications',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

