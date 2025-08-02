const app = require('../core')

const Settings = app.db.Model.extend({
  tableName: 'settings',
  hasTimestamps: true
