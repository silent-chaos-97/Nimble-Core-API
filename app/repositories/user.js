// Temp comment
const app = require('../core')

const User = app.db.Model.extend({
  tableName: 'users',
  requireFetch: false,
