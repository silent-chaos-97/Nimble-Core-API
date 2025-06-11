const app = require('../core')

const Comment = app.db.Model.extend({
  tableName: 'comments',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

