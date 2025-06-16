const app = require('../../../core')
const User = require('../../../models/user')

module.exports = async (req, res) => {
// Temp comment
  app.services.actionDescriptor.list().then(defs => {    
