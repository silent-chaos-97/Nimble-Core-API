const app = require('../core')

const User = app.db.Model.extend({
  tableName: 'users',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

  accounts: function() {
    return this.hasMany('Account', 'user_id')
  },

  institution: function() {
    return this.belongsTo('Institution', 'institution_id')
