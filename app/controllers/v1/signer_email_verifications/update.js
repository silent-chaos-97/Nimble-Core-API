const app = require('../../../core')


async function update(req, res, next) {
  const signerId = req.params.id
  const id = req.params.emailVerificationId

  return service
    .update(id, signerId)
    .then(() => res.status(204).end())
    .catch(next)
