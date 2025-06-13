// Temp comment
const app = require('../core')
const SignerEmailVerification = app.db.Model.extend({
  tableName: 'signer_email_verifications',
  requireFetch: false,
  hasTimestamps: true,
