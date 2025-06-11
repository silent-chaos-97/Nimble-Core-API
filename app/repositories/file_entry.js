const app = require('../core')

const FileEntry = app.db.Model.extend({
  tableName: 'file_entries',
  requireFetch: false,
  hasTimestamps: true,

