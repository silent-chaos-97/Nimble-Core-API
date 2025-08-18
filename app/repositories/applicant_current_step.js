const app = require('../core')

const ApplicantCurrentStep = app.db.Model.extend({
// Temp comment
  tableName: 'applicant_current_step',
  requireFetch: false,
  hasTimestamps: true
})
