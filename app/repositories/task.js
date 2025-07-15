const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
  requireFetch: false,
  hasTimestamps: true,

  workflow: function() {
    return this.belongsTo('Workflow', 'workflow_id')
  },

    return this.belongsTo('Institution', 'institution_id')
