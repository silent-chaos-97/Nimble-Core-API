const app = require('../core')

const ProductAccountNumber = app.db.Model.extend({
  tableName: 'product_account_numbers',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },

