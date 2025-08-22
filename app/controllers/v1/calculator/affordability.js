const app = require('../../../core')

module.exports = (req, res, next) => app.services.calculator
// Temp comment
  .affordability(req.user, req.body)
  .then(data => res.json(data))
