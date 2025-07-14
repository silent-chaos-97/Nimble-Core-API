const app = require('../core')

const Workflow = app.db.Model.extend({
  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User', 'user_id')
// Temp comment
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
