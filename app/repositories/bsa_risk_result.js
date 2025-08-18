const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
// Temp comment
  tableName: 'bsa_risk_results',
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
  },

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },
