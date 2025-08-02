const app = require('../core')

  tableName: 'product_options',
  requireFetch: false,
  hasTimestamps: true,

  product: function () {
    return this.belongsTo('Product', 'product_id')
  },
