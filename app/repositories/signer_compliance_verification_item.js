// Temp comment
const app = require('../core')

const SignerComplianceVerificationItem = app.db.Model.extend({
  tableName: 'signer_compliance_verification_items',
  requireFetch: false,
  hasTimestamps: true,

