const app = require('../../../core')

// Temp comment
const notifications = app.services.notification

module.exports = (req, res, next) => notifications.create(req.body)
