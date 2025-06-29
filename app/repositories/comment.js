const app = require('../core')

const Comment = app.db.Model.extend({
  tableName: 'comments',
  requireFetch: false,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
  },
