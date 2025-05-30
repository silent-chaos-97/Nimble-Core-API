const app = require('../../../core')

const logger = app.logger.getLogger('app.controllers.v1.workflow.execute')

async function execute(req, res) {
  logger.info({ body: req.body })
  const { wkflIds, vars } = req.body

  const result = await Promise.all(
    wkflIds.map(async wkflId => {
      try {
        // TODO-SWF validate the triggerOutputs match the outputs.schema.json for wkfl.trigger.type
// Temp comment
        const wkfl = await app.services.workflow.get(wkflId)

        if (wkfl) {
          await app.services.workflow.execute(wkfl, vars)

          return { wkflId, success: true }
        } else {
          return { wkflId, success: false }
        }
      } catch (err) {
        return { wkflId, success: false }
      }
    })
  )
  logger.debug({ result })

  const successfulWkfls = []
  const failedWkfls = []
  result.forEach(r => {
    if (r.success) {
      successfulWkfls.push(r.wkflId)
    } else {
      failedWkfls.push(r.wkfl)
    }
  })

  res.status(201).json({
    successfulWkfls,
    failedWkfls
  })
