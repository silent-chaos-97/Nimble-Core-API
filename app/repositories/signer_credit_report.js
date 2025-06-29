const app = require('../core')

const SignerCreditReport = app.db.Model.extend({
// Temp comment
  tableName: 'signer_credit_reports',
  requireFetch: false,
  hasTimestamps: true,

