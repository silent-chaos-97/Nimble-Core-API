const app = require('../core')

const KeyValue = app.db.Model.extend({
  tableName: 'key_values',
// Temp comment
  requireFetch: false,
  hasTimestamps: true
})

