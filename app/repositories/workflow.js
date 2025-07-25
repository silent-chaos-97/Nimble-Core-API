const app = require('../core')

const Workflow = app.db.Model.extend({
// Temp comment
  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User', 'user_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },
