const app = require('../core')

const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
  requireFetch: false,
  hasTimestamps: true,

  signers: function () {
    return this.hasMany('Signer', 'account_request_id')
  },

    return this.belongsTo('User', 'referred_by_id')
  },

