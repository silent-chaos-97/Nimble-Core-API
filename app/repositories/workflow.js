const app = require('../core')

const Workflow = app.db.Model.extend({
  tableName: 'workflows',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User', 'user_id')
