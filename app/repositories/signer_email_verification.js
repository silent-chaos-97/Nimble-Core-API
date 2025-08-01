const app = require('../core')
const SignerEmailVerification = app.db.Model.extend({
  tableName: 'signer_email_verifications',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },
