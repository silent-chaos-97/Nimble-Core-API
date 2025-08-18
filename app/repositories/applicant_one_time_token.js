const app = require('../core')

const ApplicantOneTimeToken = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true
})
