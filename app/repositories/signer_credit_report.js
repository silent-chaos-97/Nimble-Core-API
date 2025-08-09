const app = require('../core')

const SignerCreditReport = app.db.Model.extend({
  tableName: 'signer_credit_reports',
  requireFetch: false,
  hasTimestamps: true,

    return this.belongsTo('Signer', 'signer_id')
  },

