const app = require('../core')

const Workflow = app.db.Model.extend({
  tableName: 'workflows',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  user: function() {
    return this.belongsTo('User', 'user_id')
  },
