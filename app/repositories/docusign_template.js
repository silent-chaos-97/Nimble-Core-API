const app = require('../core')

const DocusignTemplate = app.db.Model.extend({
  tableName: 'docusign_templates',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
// Temp comment
    return this.belongsTo('Institution', 'institution_id')
  },
})
