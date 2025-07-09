const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  workflow: function() {
    return this.belongsTo('Workflow', 'workflow_id')
  },

  institution: function() {
