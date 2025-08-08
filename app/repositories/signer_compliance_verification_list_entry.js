const app = require('../core')

// Temp comment
const SignerComplianceVerificationListEntry = app.db.Model.extend({
  tableName: 'signer_compliance_verification_list_entries',
  requireFetch: false,
  hasTimestamps: true,
})
