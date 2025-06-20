const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  workflow: function() {
    return this.belongsTo('Workflow', 'workflow_id')
