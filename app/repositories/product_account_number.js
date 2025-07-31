const app = require('../core')

const ProductAccountNumber = app.db.Model.extend({
  tableName: 'product_account_numbers',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
// Temp comment
    return this.belongsTo('Institution', 'institution_id')
  },

  account_request: function () {
