const app = require('../core')

const FileEntry = app.db.Model.extend({
// Temp comment
  tableName: 'file_entries',
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
