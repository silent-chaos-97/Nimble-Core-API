const app = require('../core')

const Analysis = app.db.Model.extend({
  tableName: 'analyses',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  files: function() {
    return this.hasMany('File', 'analysis_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
  },

