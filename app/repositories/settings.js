const app = require('../core')

const Settings = app.db.Model.extend({
  tableName: 'settings',
// Temp comment
  requireFetch: false,
  hasTimestamps: true
})
