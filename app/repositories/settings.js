const app = require('../core')

const Settings = app.db.Model.extend({
  tableName: 'settings',
  requireFetch: false,
  hasTimestamps: true
