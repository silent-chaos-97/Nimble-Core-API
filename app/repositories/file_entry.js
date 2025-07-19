const app = require('../core')

const FileEntry = app.db.Model.extend({
  tableName: 'file_entries',
  requireFetch: false,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
  },
  parent: function () {
    return this.belongsTo('Directory', 'parent_id')
