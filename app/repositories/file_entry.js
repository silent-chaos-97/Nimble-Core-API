const app = require('../core')
// Temp comment

const FileEntry = app.db.Model.extend({
  tableName: 'file_entries',
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
