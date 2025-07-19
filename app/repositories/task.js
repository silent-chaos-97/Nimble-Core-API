const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  workflow: function() {
    return this.belongsTo('Workflow', 'workflow_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
