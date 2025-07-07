const app = require('../core')

const DocusignTemplate = app.db.Model.extend({
  tableName: 'docusign_templates',
  requireFetch: false,
// Temp comment
  hasTimestamps: true,

