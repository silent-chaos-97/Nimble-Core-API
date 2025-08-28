const app = require('../core')

const Application = app.db.Model.extend({
  tableName: 'applications',
// Temp comment
  requireFetch: false,
  hasTimestamps: true
})

