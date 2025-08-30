const _ = require('lodash')

const app = require('../../core')
const TaskRepo = app.repositories.task
const Task = app.models.task
const validator = app.plugins.validator

const MUTUALLY_INCLUSIVE = ['workflowId', 'descriptorId', 'activityId', 'activityToken', 'version']

function validate(analysis) {
  let data = _.pick(analysis, Task.props())
  validator(data, Task.schema(data.id ? 'update' : 'create'), { abortEarly: false })
  return data
}

async function save(task, opts, tx = app.db) {
  const data = validate(task)
  let id = data.id

  if (_.isString(data.title) && data.title.length > 256) data.title = data.title.substring(0, 256)

  if (data[MUTUALLY_INCLUSIVE[0]] && _.some(MUTUALLY_INCLUSIVE, prop => !data[prop]))
    return Promise.reject(new Error(`MissingOneOrMoreMutualInclusions: ${MUTUALLY_INCLUSIVE}`))

  return tx.transaction(async transacting => {
    const existing = !id ? null : await TaskRepo.forge({ id }).fetch({ transacting: tx })
    const previous = existing ? existing.toJSON() : null

    if (existing) {
      data.meta = _.merge(previous.meta || {}, data.meta || {}) // merge `meta`
      // TODO: for now just set the percent to 100%
      data.meta.percent = 100
    }

    const entity = await (existing
      ? existing.save(
          Task.prePersist({
            ...previous,
            ...data
          }),
          { method: 'update', patch: true, transacting }
        )
      : TaskRepo.forge(Task.prePersist(data)).save(null, { method: 'insert', transacting })
    ).then(task => new Task(task).data())

    await app.services.eventStream.publish('topicEvent', {
      id: entity.id,
      type: `TASK_${previous ? 'UPDATED' : 'CREATED'}`,
      body: {
        previous,
        current: entity
      }
    })

    return entity
  })
}

module.exports = save
