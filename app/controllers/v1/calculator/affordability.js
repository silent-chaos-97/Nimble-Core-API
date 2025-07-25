const app = require('../../../core')

module.exports = (req, res, next) => app.services.calculator
  .affordability(req.user, req.body)
