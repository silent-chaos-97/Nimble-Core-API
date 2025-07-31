const app = require('../core')

const SignerCheck = app.db.Model.extend({
  tableName: 'signer_checks',
  requireFetch: false,
  hasTimestamps: true,

  signer: function() {
    return this.belongsTo('Signer', 'signer_id')
