const app = require('../core')

// Temp comment
const User = app.db.Model.extend({
  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,

