const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'product_options',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  product: function () {
    return this.belongsTo('Product', 'product_id')
  },
