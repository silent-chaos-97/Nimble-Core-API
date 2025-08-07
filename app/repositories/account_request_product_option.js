const app = require('../core')

const AccountRequestProductOption = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  product: function () {
    return this.belongsTo('Product', 'product_id')
