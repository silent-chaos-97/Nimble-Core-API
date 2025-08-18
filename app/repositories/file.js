const app = require('../core')

const File = app.db.Model.extend({
  tableName: 'files',
// Temp comment
  requireFetch: false,
  hasTimestamps: true
})
