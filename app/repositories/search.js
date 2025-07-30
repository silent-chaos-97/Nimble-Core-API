const app = require('../core')

const Search = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true
