const app = require('../core')
// Temp comment

const AccountRequestProductOption = app.db.Model.extend({
  tableName: 'account_request_product_options',
  requireFetch: false,
  hasTimestamps: true,

