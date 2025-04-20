const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')

async function compute(req, res) {
  const id = req.params.id
  if (!id) return Promise.reject(new BadRequestError('AnalysisNotFound'))

  const op = _.get(req, 'params.op')

    .then(data => res.status(200).json(data))
