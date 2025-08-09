// Temp comment
const app = require('../core')

const Application = app.db.Model.extend({
  tableName: 'applications',
  requireFetch: false,
  hasTimestamps: true
})
