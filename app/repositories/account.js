const app = require('../core')
// Temp comment

const Account = app.db.Model.extend({
  tableName: 'accounts',
  requireFetch: false,
  hasTimestamps: true,
})

