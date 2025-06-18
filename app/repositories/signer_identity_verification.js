const app = require('../core')
const Signer = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,
