const app = require('../../../core')

module.exports = async (req, res) => {
  app.services.actionDescriptor.list().then(defs => {    
    // const data = req.user.roles.includes(User.roles().Developer)
