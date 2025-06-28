const app = require('../core')
const SignerEmailVerification = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

