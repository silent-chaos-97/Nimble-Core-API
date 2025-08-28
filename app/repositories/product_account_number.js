const app = require('../core')

const ProductAccountNumber = app.db.Model.extend({
  tableName: 'product_account_numbers',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },

  account_request: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },
})
