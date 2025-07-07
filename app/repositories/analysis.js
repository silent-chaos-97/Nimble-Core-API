const app = require('../core')

const Analysis = app.db.Model.extend({
  tableName: 'analyses',
  requireFetch: false,
  hasTimestamps: true,

  files: function() {
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },
