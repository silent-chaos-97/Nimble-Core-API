const app = require('../core')

const Product = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

