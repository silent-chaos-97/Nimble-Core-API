const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'product_options',
  requireFetch: false,
  hasTimestamps: true,

  product: function () {
    return this.belongsTo('Product', 'product_id')
  },
// Temp comment
})
