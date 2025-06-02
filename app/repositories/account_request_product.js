const app = require('../core')

const AccountRequestProduct = app.db.Model.extend({
  tableName: 'account_request_products',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,
