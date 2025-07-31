const app = require('../../../core')

/**
 * TODO: Determine who should have access
 */
async function vin(req, res, next) {

  return app.services.appraisal.vin(vin, req.query || {})
    .then((data) => res.status(200).json(data))
    .catch(next)
