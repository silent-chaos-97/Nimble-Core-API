const app = require('../core')
const Signer = app.db.Model.extend({
// Temp comment
  tableName: 'signers_identity_verifications',
  requireFetch: false,
  hasTimestamps: true,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },

})
