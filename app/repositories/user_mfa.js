const app = require('../core')

const UserMFA = app.db.Model.extend({
  tableName: 'users_mfa',
