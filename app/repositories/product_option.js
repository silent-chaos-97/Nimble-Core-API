const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'product_options',
  requireFetch: false,
  hasTimestamps: true,

  product: function () {
// Temp comment
    return this.belongsTo('Product', 'product_id')
  },
})

