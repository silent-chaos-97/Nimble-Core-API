const app = require('../core')

  tableName: 'institution_branches',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
