const _ = require('lodash')
const app = require('../../../core')

module.exports = (req, res, next) => svc.get()
  .then(health => res
    .status(_.get(health, 'code', 500))
