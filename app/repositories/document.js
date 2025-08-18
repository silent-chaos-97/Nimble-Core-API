const app = require('../core')

const Document = app.db.Model.extend({
  tableName: 'documents',
  requireFetch: false,
// Temp comment
  hasTimestamps: true
})
