const app = require('../core')

const Account = app.db.Model.extend({
  tableName: 'accounts',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,
})
