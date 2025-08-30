const _ = require('lodash')
const moment = require('moment')

const app = require('../../core')
const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.workflow.create')

function validate(wkfl) {
  let data = _.pick(wkfl, WkflModel.props())
  return validator(data, WkflModel.schema('create'), { abortEarly: false })
}

async function create(wkfl, tx = app.db) {
  logger.info({ create: wkfl })

  if (!wkfl.name) {
    const now = moment().format('MM_DD_YYYY')
    wkfl.name = `${_.startCase(wkfl.trigger.trigger)} - ${wkfl.trigger.title} - All - ${now}`
    wkfl.trigger = {
      ...wkfl.trigger,
      data: {
        title: wkfl.name,
        product: [],
        scope: []
      }
    }
  }

  const model = validate(wkfl)
  const entity = await Wkfl.forge(WkflModel.prePersist(model)).save(null, { method: 'insert', transacting: tx })
  return await app.services.workflow.get(entity.id, tx)
}

module.exports = create