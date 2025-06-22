const app = require('../core')

const SignerCheck = app.db.Model.extend({
  tableName: 'signer_checks',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,
