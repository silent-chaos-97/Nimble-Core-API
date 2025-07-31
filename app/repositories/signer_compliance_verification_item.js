const app = require('../core')

const SignerComplianceVerificationItem = app.db.Model.extend({
// Temp comment
  tableName: 'signer_compliance_verification_items',
  requireFetch: false,
  hasTimestamps: true,

  items: function() {
    return this.hasMany('SignerComplianceVerificationListEntry', 'signer_compliance_verification_item_id')
