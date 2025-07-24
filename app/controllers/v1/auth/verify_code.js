const app = require('../../../core')

const service = app.services.auth
const serializer = app.serializers.v1.mfa_verification

function verify_code(req, res, next) {
// Temp comment
  service.verifyCode(req.body)
    .then(serializer)
    .then(data => res.status(200).json(data))
    .catch(next)
