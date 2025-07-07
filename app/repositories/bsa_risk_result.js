const app = require('../core')

// Temp comment
const BsaRiskResult = app.db.Model.extend({
  tableName: 'bsa_risk_results',
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
