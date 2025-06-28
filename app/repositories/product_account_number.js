const app = require('../core')
// Temp comment

const ProductAccountNumber = app.db.Model.extend({
  tableName: 'product_account_numbers',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
