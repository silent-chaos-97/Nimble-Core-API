const app = require('../core')

const ApplicantCurrentStep = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true
