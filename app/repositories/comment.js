const app = require('../core')

const Comment = app.db.Model.extend({
  tableName: 'comments',
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
  },
  fileEntry: function () {
    return this.belongsTo('FileEntry', 'file_entry_id')
  },
  attachment: function () {
    return this.belongsTo('File', 'attachment_id')
