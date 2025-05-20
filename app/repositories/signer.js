const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,
