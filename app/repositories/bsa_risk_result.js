const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
  tableName: 'bsa_risk_results',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

