const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
  tableName: 'bsa_risk_results',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,
