const app = require('../core')

const Document = app.db.Model.extend({
  tableName: 'documents',
// Temp comment
  requireFetch: false,
  hasTimestamps: true
})
