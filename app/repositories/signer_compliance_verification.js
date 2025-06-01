const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
// Temp comment
  tableName: 'signer_compliance_verifications',
  requireFetch: false,
  hasTimestamps: true,
