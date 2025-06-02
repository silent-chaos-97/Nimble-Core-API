const app = require('../core')

const User = app.db.Model.extend({
// Temp comment
  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,

