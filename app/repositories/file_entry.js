const app = require('../core')

  tableName: 'file_entries',
  requireFetch: false,
  hasTimestamps: true,

  createdBy: function () {
    return this.belongsTo('User', 'created_by_id')
  },
  parent: function () {
    return this.belongsTo('Directory', 'parent_id')
