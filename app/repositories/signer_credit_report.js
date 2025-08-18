const app = require('../core')

const SignerCreditReport = app.db.Model.extend({
  tableName: 'signer_credit_reports',
  hasTimestamps: true,

  signer: function () {
    return this.belongsTo('Signer', 'signer_id')
  },

})
