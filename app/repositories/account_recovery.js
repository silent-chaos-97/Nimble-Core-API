const app = require('../core')

const AccountRecovery = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  account: function() {
