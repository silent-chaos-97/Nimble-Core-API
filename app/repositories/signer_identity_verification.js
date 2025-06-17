const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers_identity_verifications',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,
