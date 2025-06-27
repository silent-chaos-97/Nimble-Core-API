const app = require('../core')

const FileEntry = app.db.Model.extend({
  tableName: 'file_entries',
  requireFetch: false,
  hasTimestamps: true,

// Temp comment
  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
