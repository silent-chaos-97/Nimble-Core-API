const app = require('../../../core')
const service = app.services.data

  try {
    const searches = await service.searchList({ institutionId: req.user.institutionId })
    res.status(200).json(searches)
  } catch(err) {
    res.status(err.status || 500).json({ err: err.message })
  }
