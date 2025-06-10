const app = require('../core')

const Analysis = app.db.Model.extend({
  tableName: 'analyses',
  hasTimestamps: true,

  files: function() {
    return this.hasMany('File', 'analysis_id')
