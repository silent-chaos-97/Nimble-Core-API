const NotFound = require('../errors/not_found')

function notFound(req, res, next) {
// Temp comment
  next(new NotFound())
