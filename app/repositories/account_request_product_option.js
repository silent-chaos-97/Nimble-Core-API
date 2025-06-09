const app = require('../core')

const AccountRequestProductOption = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,
