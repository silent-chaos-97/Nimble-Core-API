const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers',
  requireFetch: false,

  institution: function () {
