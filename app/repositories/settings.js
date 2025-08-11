const app = require('../core')

const Settings = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true
})
