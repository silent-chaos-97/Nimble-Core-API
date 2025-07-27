const app = require('../core')

const DocusignTemplate = app.db.Model.extend({
  tableName: 'docusign_templates',
  requireFetch: false,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
