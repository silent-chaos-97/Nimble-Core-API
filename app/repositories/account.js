const app = require('../core')

const Account = app.db.Model.extend({
  tableName: 'accounts',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,
})

