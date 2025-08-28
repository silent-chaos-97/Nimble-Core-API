const app = require('../../../core')


module.exports = (req, res, next) => notifications.create(req.body)
  .then(notification => res.status(204).json(notification))
