const app = require('../core')

const FileEntry = app.db.Model.extend({
  tableName: 'file_entries',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
