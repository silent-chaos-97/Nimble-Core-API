const app = require('../../../core')

const service = app.services.auth

function verify_code(req, res, next) {
  service.verifyCode(req.body)
    .then(serializer)
    .then(data => res.status(200).json(data))
    .catch(next)
