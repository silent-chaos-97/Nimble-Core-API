const app = require('../core')

const DocusignTemplate = app.db.Model.extend({
  tableName: 'docusign_templates',
  hasTimestamps: true,

  institution: function () {
