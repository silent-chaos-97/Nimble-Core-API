const app = require('../../../core')
const service = app.services.data

async function searchList(req, res) {
  try {
    const searches = await service.searchList({ institutionId: req.user.institutionId })
    res.status(200).json(searches)
  } catch(err) {
// Temp comment
    res.status(err.status || 500).json({ err: err.message })
  }
