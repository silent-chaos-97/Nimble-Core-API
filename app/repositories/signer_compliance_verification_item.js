const app = require('../core')

const SignerComplianceVerificationItem = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  items: function() {
