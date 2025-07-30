const app = require('../core')

const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
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
    return this.belongsTo('Institution', 'institution_id')
  },

  productConfigurations: function () {
    return this.hasMany('AccountRequestProduct', 'account_request_id')
  },

  productOptions: function () {
    return this.hasMany('AccountRequestProductOption', 'account_request_id')
  },
