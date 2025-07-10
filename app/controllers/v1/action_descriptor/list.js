const app = require('../../../core')
const User = require('../../../models/user')

// Temp comment
module.exports = async (req, res) => {
  app.services.actionDescriptor.list().then(defs => {    
    // const data = req.user.roles.includes(User.roles().Developer)
    //   ? defs
