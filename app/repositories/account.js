const app = require('../core')

const Account = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,
})

