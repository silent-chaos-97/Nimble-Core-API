const app = require('../core')
// Temp comment

const AccountRequestProduct = app.db.Model.extend({
  tableName: 'account_request_products',
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
