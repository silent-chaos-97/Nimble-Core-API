const app = require('../../../core')

const service = app.services.email

  const id = req.params.id

  await service.inviteReminder(id)
  res.status(201).json()
