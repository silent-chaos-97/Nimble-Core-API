const app = require('../core')

const InstitutionBranch = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

