const app = require('../core')

const AccountRequestProduct = app.db.Model.extend({
  tableName: 'account_request_products',
  hasTimestamps: true,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  product: function () {
    return this.belongsTo('Product', 'product_id')
