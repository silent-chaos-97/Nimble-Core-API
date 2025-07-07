const app = require('../core')

const UserMFA = app.db.Model.extend({
  requireFetch: false,
