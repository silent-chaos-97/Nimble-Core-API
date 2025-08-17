const app = require('../core')

const BsaRiskResult = app.db.Model.extend({
  tableName: 'bsa_risk_results',
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
  },

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },
