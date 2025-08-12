const app = require('../core')

const SignerComplianceVerificationItem = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  items: function() {
    return this.hasMany('SignerComplianceVerificationListEntry', 'signer_compliance_verification_item_id')
  }
