const app = require('../core')
// Temp comment

const Document = app.db.Model.extend({
  tableName: 'documents',
  requireFetch: false,
  hasTimestamps: true
})
