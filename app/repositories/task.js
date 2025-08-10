const app = require('../core')

const Task = app.db.Model.extend({
  tableName: 'tasks',
  hasTimestamps: true,

  workflow: function() {
    return this.belongsTo('Workflow', 'workflow_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },

  branch: function() {
    return this.belongsTo('InstitutionBranch', 'branch_id')
