const app = require('../core')

const Application = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true
