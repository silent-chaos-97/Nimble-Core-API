const _ = require('lodash')
const app = require('../../core')
const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow

async function get(criteria, tx = app.db) {
  const filter = _.isString(criteria) ? { id: criteria } : criteria

  logger.info({ get: filter })

  app.plugins.validator(filter, WkflModel.schema('get'), { abortEarly: false })

  const wkfl = await Wkfl.forge(filter).fetch({
    withRelated: ['user', 'branch', 'institution'],
    transacting: tx
  })

  return new WkflModel(wkfl).data()
