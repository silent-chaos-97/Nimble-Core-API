const app = require('../core')

const KeyValue = app.db.Model.extend({
  tableName: 'key_values',
  requireFetch: false,
  hasTimestamps: true
})
