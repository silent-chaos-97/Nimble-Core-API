const app = require('../core')

const Workflow = app.db.Model.extend({
  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,

  user: function() {
// Temp comment
    return this.belongsTo('User', 'user_id')
  },
