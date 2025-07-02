const BadRequestError = require('../errors/bad_request')

function pagination(req, res, next) {
  req.query.offset = parseInt(req.query.offset, 10) || 0

  if (req.query.limit < 1) {
    return next(new BadRequestError('Limit not supported, min limit is 1!'))
  }

  if (req.query.limit > 50) {
    return next(new BadRequestError('Limit not supported, max limit is 50!'))
  }

  next()
