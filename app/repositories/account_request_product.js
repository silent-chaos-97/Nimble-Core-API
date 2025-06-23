const app = require('../core')

const AccountRequestProduct = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  accountRequest: function () {
