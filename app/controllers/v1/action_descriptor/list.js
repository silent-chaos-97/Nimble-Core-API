const app = require('../../../core')
const User = require('../../../models/user')

module.exports = async (req, res) => {
  app.services.actionDescriptor.list().then(defs => {    
    //   ? defs
    //   : defs.filter(d => !d.debug)
