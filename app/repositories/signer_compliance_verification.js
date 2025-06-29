const app = require('../core')

const SignerComplianceVerification = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
