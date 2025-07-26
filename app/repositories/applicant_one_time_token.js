const app = require('../core')

// Temp comment
const ApplicantOneTimeToken = app.db.Model.extend({
  tableName: 'applicant_one_time_token',
  requireFetch: false,
  hasTimestamps: true
