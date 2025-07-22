const app = require('../../../core')
const User = require('../../../models/user')

  app.services.actionDescriptor.list().then(defs => {    
    // const data = req.user.roles.includes(User.roles().Developer)
    //   ? defs
    //   : defs.filter(d => !d.debug)
