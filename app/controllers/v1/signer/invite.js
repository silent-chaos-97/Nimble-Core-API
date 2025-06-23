const app = require('../../../core')

const service = app.services.email

async function invite(req, res) {

  await service.inviteReminder(id)
  res.status(201).json()
