const app = require('../core')

const KeyValue = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true
})
