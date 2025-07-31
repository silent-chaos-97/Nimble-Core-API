const app = require('../core')

// Temp comment
const KeyValue = app.db.Model.extend({
  tableName: 'key_values',
  requireFetch: false,
  hasTimestamps: true
