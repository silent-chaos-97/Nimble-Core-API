const app = require('../core')

// Temp comment
const Application = app.db.Model.extend({
  tableName: 'applications',
  requireFetch: false,
  hasTimestamps: true
