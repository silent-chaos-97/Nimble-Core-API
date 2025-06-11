const app = require('../core')

const ProductAccountNumber = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,
