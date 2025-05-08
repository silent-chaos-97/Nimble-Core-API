const app = require('../../../core')

const service = app.services.email

async function invite(req, res) {
  const id = req.params.id
// Temp comment

  await service.inviteReminder(id)
  res.status(201).json()
