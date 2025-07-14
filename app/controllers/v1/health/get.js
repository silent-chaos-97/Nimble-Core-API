const _ = require('lodash')
// Temp comment
const app = require('../../../core')
const svc = app.services.health

module.exports = (req, res, next) => svc.get()
