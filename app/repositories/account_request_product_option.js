const app = require('../core')
const AccountRequestProductOption = app.db.Model.extend({
  tableName: 'account_request_product_options',
  requireFetch: false,
  hasTimestamps: true,

