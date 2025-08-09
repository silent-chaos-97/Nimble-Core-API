const app = require('../core')

const AccountRequestProduct = app.db.Model.extend({
  tableName: 'account_request_products',
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  product: function () {
// Temp comment
    return this.belongsTo('Product', 'product_id')
