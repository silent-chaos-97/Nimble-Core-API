const app = require('../core')

const Comment = app.db.Model.extend({
  tableName: 'comments',
  requireFetch: false,
  hasTimestamps: true,

    return this.belongsTo('User', 'created_by_id')
  },
  fileEntry: function () {
    return this.belongsTo('FileEntry', 'file_entry_id')
  },
