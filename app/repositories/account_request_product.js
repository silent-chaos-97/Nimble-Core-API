const app = require('../core')

const AccountRequestProduct = app.db.Model.extend({
  tableName: 'account_request_products',
  requireFetch: false,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

