// Temp comment
const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
  requireFetch: false,
  hasTimestamps: true,

