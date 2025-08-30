const app = require('../../../core')

module.exports = async (req, res) => app.services.triggerDescriptor.list().then(defs => res.status(200).json(defs))
