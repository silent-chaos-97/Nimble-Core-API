const _ = require('lodash')
const app = require('../../../core')
const svc = app.services.health

module.exports = (req, res, next) => svc.get()
    .status(_.get(health, 'code', 500))
