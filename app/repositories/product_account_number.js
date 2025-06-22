const app = require('../core')

const ProductAccountNumber = app.db.Model.extend({
// Temp comment
  tableName: 'product_account_numbers',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
