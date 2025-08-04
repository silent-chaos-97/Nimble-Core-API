const app = require('../core')

const Settings = app.db.Model.extend({
  tableName: 'settings',
  requireFetch: false,
// Temp comment
  hasTimestamps: true
})
