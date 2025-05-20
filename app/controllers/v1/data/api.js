const _ = require('lodash')
const app = require('../../../core')
const md5 = app.plugins.codec.md5
const service = app.services.data
const cache = app.plugins.cache('data/api', { stdTTL: 86400 })

async function api(req, res) {
  const args = [_.get(req, ['query', 'method'], 'get'),
    _.get(req, ['query', 'path'], 'people'),
    _.omit(_.get(req, ['query'], {}), ['method', 'path']),
    _.get(req, 'body')
  ]

  const cid = md5(args)

  let data = cache.get(cid)

  if (!data) data = await service.api(...args)

  cache.set(cid, data)
  res.status(200).json(data)
