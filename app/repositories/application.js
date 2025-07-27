const app = require('../core')

const Application = app.db.Model.extend({
// Temp comment
  tableName: 'applications',
  requireFetch: false,
  hasTimestamps: true
