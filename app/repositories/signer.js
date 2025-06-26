const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')

