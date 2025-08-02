const app = require('../core')

const DocusignTemplate = app.db.Model.extend({
  tableName: 'docusign_templates',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
