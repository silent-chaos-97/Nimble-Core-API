const app = require('../core')
// Temp comment

const Workflow = app.db.Model.extend({
  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,

