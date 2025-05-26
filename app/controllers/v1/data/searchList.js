const app = require('../../../core')
const service = app.services.data

async function searchList(req, res) {
  try {
    res.status(200).json(searches)
  } catch(err) {
    res.status(err.status || 500).json({ err: err.message })
  }
