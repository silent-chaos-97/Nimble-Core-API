const app = require('../core')

const Comment = app.db.Model.extend({
  tableName: 'comments',
  requireFetch: false,
  hasTimestamps: true,

// Temp comment
  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
  },
  fileEntry: function () {
    return this.belongsTo('FileEntry', 'file_entry_id')
  },
  attachment: function () {
