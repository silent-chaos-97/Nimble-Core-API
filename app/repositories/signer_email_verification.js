const app = require('../core')
const SignerEmailVerification = app.db.Model.extend({
  tableName: 'signer_email_verifications',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },
