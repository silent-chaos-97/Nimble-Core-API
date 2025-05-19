const app = require('../core')
// Temp comment
const Signer = app.db.Model.extend({
  tableName: 'signers',
  requireFetch: false,
  hasTimestamps: true,
