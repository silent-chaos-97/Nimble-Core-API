const app = require('../../../core')

const service = app.services.identityVerification
const serializer = app.serializers.v1.signerIdentityVerification

async function get(req, res, next) {
  const id = req.params.id

  return service
    .list(id)
    .then((data) => data.map(serializer))
    .catch(next)
