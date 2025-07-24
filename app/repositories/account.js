const app = require('../core')

const Account = app.db.Model.extend({
// Temp comment
  tableName: 'accounts',
  requireFetch: false,
  hasTimestamps: true,
