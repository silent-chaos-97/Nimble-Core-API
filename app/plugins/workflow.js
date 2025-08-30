const _ = require('lodash')
const fs = require('fs')

function getActivityPath(descriptorId, version, step) {
  if (!descriptorId || (step && !version)) return null

  const baseDir = `${__dirname}/../services/action_descriptor/defs/${descriptorId}/activities`
  if (!version) return baseDir

  const vDir = `${baseDir}/v${version}`
  if (!step) return vDir

  return `${vDir}/${step}.${descriptorId}.js`
}

function getActivityHandler(action, version, step) {
  return require(getActivityPath(action, version, step))
}

async function getActivities(wkfl) {
  // TODO-SWF currently we get the latest version, though, we will need to use store the version of the activity within the workflow model
  // otherwise previous executions will also run the latest version of each action instead of the latest version when they were created
  const activities = _.get(wkfl, 'activities', [])
    .map(act => ({ ...act, descriptorId: act.descriptorId || act.action }))
    .map(act => ({ ...act, inputs: act.data || {} }))
    .filter(act => act.id && act.descriptorId)

  return Promise.all(activities.map(async(activity) => {
    const descriptorId = activity.descriptorId

    const versions = await fs.promises.readdir(getActivityPath(descriptorId))
      .then(dirs => dirs.filter(dir => /^[vV][1-9]+$/.test(dir)))
      .then(dirs => dirs.map(dir => dir.substring(1)))

    const version = activity.version && versions.includes(activity.version) ? activity.version : _.max(versions)

    const steps = await fs.promises.readdir(getActivityPath(descriptorId, version))
      .then(files => files.filter(file => new RegExp(`^[1-9]+\\.${descriptorId}\\.js$`).test(file)))
      .then(files => files.map(file => file.substring(0, file.indexOf('.'))))

    return steps.map(step => ({
      ..._.omit(activity, ['action', 'data']),
      key: activity.id,
      id: `${activity.id}.${step}`,
      name: `${activity.descriptorId}.${step}`,
      step,
      version,
      timeout: _.max([60, activity.timeout || 0])
    }))
  })).then(all => all.flat(Infinity))
}

module.exports = {
  getActivities,
  getActivityPath,
  getActivityHandler
}
