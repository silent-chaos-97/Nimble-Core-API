const app = require('../../../core')


async function invite(req, res) {
  const id = req.params.id

  await service.inviteReminder(id)
  res.status(201).json()
