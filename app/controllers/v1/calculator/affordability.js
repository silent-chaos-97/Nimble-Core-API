
module.exports = (req, res, next) => app.services.calculator
  .affordability(req.user, req.body)
  .then(data => res.json(data))
