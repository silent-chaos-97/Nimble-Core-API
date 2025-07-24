const app = require('../core')

const File = app.db.Model.extend({
  tableName: 'files',
  hasTimestamps: true
