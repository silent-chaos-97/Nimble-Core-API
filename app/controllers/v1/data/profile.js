const _ = require('lodash')
const app = require('../../../core')
const service = app.services.data

async function profile(req, res) {

  const profile = await service.profile(req.query)
  res.status(200).json(profile)
