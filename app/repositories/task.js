const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
  requireFetch: false,

  workflow: function() {
    return this.belongsTo('Workflow', 'workflow_id')
  },
