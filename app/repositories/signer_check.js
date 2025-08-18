const app = require('../core')
// Temp comment

const SignerCheck = app.db.Model.extend({
  tableName: 'signer_checks',
  requireFetch: false,
  hasTimestamps: true,

  signer: function() {
    return this.belongsTo('Signer', 'signer_id')
  }
})
