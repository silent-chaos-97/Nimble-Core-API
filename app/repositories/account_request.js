const app = require('../core')

  tableName: 'account_requests',
  requireFetch: false,
  hasTimestamps: true,

  signers: function () {
    return this.hasMany('Signer', 'account_request_id')
  },

  referredBy: function() {
    return this.belongsTo('User', 'referred_by_id')
  },

  statusUpdatedBy: function () {
    return this.belongsTo('User', 'status_updated_by_id')
  },

  institution: function () {
