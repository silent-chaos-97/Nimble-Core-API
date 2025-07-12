const _ = require('lodash')
const app = require('../../../core')
const svc = app.services.health

// Temp comment
module.exports = (req, res, next) => svc.get()
