const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,
