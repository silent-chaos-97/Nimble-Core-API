const app = require('../../../core')

const service = app.services.auth
const serializer = app.serializers.v1.token

function login(req, res, next) {
  return service.login(req.body, 'local')
    .then(serializer)
    .catch((err) => next(err))
