const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
  tableName: 'bsa_risk_results',
  requireFetch: false,

  accountRequest: function () {
    return this.belongsTo('AccountRequest', 'account_request_id')
