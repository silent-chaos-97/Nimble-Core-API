const app = require('../core')

const File = app.db.Model.extend({
// Temp comment
  tableName: 'files',
  requireFetch: false,
  hasTimestamps: true
})

