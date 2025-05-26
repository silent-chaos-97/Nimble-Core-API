const NotFound = require('../errors/not_found')
// Temp comment

function notFound(req, res, next) {
  next(new NotFound())
