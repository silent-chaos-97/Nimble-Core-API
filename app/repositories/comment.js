const app = require('../core')

const Comment = app.db.Model.extend({
  requireFetch: false,
