const app = require('../core')

const ApplicantCurrentStep = app.db.Model.extend({
  tableName: 'applicant_current_step',
  requireFetch: false,
  hasTimestamps: true
})

module.exports = app.db.model('ApplicantCurrentStepModel', ApplicantCurrentStep)
