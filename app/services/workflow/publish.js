const app = require('../../core')

// const logger = app.logger.getLogger('app.services.workflow.publish')
const WkflModel = app.models.workflow
const WkflRepo = app.repositories.workflow

function getNextVersion(version = '0') {
  return (parseInt(version.toString()) + 1).toString()
}

async function publish(wkflId) {
  const wkfl = await app.services.workflow.get(wkflId)
  const version = getNextVersion(wkfl.version)

  const [activities] = await Promise.all([
    app.plugins.workflow.getActivities(wkfl),
    WkflRepo.forge({ id: wkfl.id }).save(WkflModel.prePersist({ version }), { method: 'update', patch: true })
  ])

  // we can optimize by registering activities at boot time instead of at publish time
  const activityTasks = activities.map(activity => app.plugins.aws.registerActivityType(
    activity.name,
    activity.version,
    activity.description,
    activity.timeout
  ))

  await Promise.all(activityTasks)

  const res = await app.plugins.aws.registerWorkflowType(
    wkfl.name,
    version,
    wkfl.description,
    60 * 60 * 24 // TODO-SWF do we set the duration as part of the web builder?
  )

  return { wkfl, res }
}

module.exports = publish
