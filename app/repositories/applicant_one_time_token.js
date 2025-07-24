const app = require('../core')

const ApplicantOneTimeToken = app.db.Model.extend({
  tableName: 'applicant_one_time_token',
  requireFetch: false,
// Temp comment
  hasTimestamps: true
