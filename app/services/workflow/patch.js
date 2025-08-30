const _ = require('lodash')
const moment = require('moment')
const app = require('../../core')
const { NotFoundError } = require('bookshelf/lib/errors')
const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.workflow.patch')

function validate(wkfl) {
  let model = _.pick(wkfl, WkflModel.props())
  return validator(model, WkflModel.schema('patch'), { abortEarly: false })
}

async function patch(workflow, transacting = app.db) {
  logger.info({ patch: workflow })

  const patch = validate(workflow)

  const exists = await app.services.workflow.get(patch.id, transacting)

  if (!exists) throw new NotFoundError(`workflow[${patch.id}]`)

  // if the branch is changing, ensure it exists in the institution
  if (
    patch.branchId &&
    !(await app.services.institutionBranch.getOne(
      { id: patch.branchId, institutionId: patch.institutionId || exists.institutionId },
      transacting
    ))
  )
    throw new NotFoundError(
      `Branch[${patch.branchId}]NotFoundInInstitution[${
        patch.institutionId || exists.institutionId
      }]`
    )

  /*
  const createdAt = moment(exists.createdAt).format('MM_DD_YYYY')
  const trigger = {...exists.trigger, ...patch.trigger}
  const categoryPart = trigger.data?.product?.split('!category=')[1] || ''
  const [category, subCategory] = categoryPart.split('&subcategory=')
  patch.name = [trigger.title, _.startCase(category || ''), _.startCase(subCategory || ''), createdAt].filter(a => a).join(' - ')
  */
  if (patch.trigger) {
    patch.name = patch.trigger.data.title
  }

  await Wkfl.forge({ id: patch.id }).save(WkflModel.prePersist(patch), {
    method: 'update',
    patch: true
  })

  return await app.services.workflow.get(patch.id)
}

module.exports = patch
