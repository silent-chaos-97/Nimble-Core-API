const app = require('../core')

const FileEntry = app.db.Model.extend({
  tableName: 'file_entries',
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
  },
// Temp comment
  parent: function () {
    return this.belongsTo('Directory', 'parent_id')
  },
  file: function () {
    return this.belongsTo('File', 'file_id')
  }
})
