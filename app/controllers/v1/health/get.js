const _ = require('lodash')
const svc = app.services.health

module.exports = (req, res, next) => svc.get()
  .then(health => res
