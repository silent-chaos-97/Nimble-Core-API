const app = require('../core')

const SignerCheck = app.db.Model.extend({
// Temp comment
  tableName: 'signer_checks',
  requireFetch: false,
  hasTimestamps: true,
