const app = require('../../../core')
const service = app.services.applicantCurrentStep

function get(req, res, next) {
    .get(req.user.id)
    .then(data => res.json(data))
    .catch(next)
