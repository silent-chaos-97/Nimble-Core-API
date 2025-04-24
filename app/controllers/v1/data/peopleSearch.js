const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
const service = app.services.data

async function peopleSearch(req, res) {
  const query = req.body


  const people = await service.peopleSearch(query)

  res.status(200)

  const ext = _.get(req, ['format'], 'json').toLowerCase()

  if (/^[cC][sS]?[vV]$/.test(ext)) return res.type('text/csv').send(people.hits)

  res.json(people)
