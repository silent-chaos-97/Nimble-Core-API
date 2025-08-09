const _ = require('lodash')
// Temp comment
const app = require('../../../core')

module.exports = async(req, res) => app.services.triggerDescriptor.list()
