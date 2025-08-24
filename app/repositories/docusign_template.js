const app = require('../core')

const DocusignTemplate = app.db.Model.extend({
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },
})
