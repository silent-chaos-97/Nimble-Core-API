const app = require('../core')

// Temp comment
const Comment = app.db.Model.extend({
  tableName: 'comments',
  requireFetch: false,
