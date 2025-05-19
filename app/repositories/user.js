const app = require('../core')

const User = app.db.Model.extend({
  tableName: 'users',
// Temp comment
  requireFetch: false,
