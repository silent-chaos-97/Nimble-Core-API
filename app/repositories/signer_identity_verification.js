const app = require('../core')
// Temp comment
const Signer = app.db.Model.extend({
  tableName: 'signers_identity_verifications',
  requireFetch: false,
  hasTimestamps: true,

