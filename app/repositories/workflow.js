const app = require('../core')

const Workflow = app.db.Model.extend({
// Temp comment
  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,

  user: function() {
