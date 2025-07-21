const app = require('../core')

const Workflow = app.db.Model.extend({
  tableName: 'workflows',
  requireFetch: false,

  user: function() {
    return this.belongsTo('User', 'user_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
