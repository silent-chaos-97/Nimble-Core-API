const app = require('../core')

  tableName: 'signer_checks',
  requireFetch: false,
  hasTimestamps: true,

  signer: function() {
    return this.belongsTo('Signer', 'signer_id')
  }
