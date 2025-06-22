const app = require('../core')

const Comment = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
