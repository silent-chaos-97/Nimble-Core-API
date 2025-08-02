const _ = require('lodash')
const app = require('../../../core')

module.exports = async(req, res) => app.services.document.create(
