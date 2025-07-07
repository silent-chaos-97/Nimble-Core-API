const app = require('../core')

const SignerCheck = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

