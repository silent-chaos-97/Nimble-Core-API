const app = require('../core')

const AccountRequestProduct = app.db.Model.extend({
  tableName: 'account_request_products',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  product: function () {
