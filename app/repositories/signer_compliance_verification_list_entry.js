const app = require('../core')

const SignerComplianceVerificationListEntry = app.db.Model.extend({
  tableName: 'signer_compliance_verification_list_entries',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,
