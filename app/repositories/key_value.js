const app = require('../core')

const KeyValue = app.db.Model.extend({
  tableName: 'key_values',
  hasTimestamps: true
})
