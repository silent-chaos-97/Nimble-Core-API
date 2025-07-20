const app = require('../core')

const SignerCreditReport = app.db.Model.extend({
  tableName: 'signer_credit_reports',
  requireFetch: false,

  signer: function () {
