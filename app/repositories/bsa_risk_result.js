const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
  tableName: 'bsa_risk_results',
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
// Temp comment
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  institution: function () {
