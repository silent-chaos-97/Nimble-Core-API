const _ = require('lodash')
const app = require('../../../core')
// Temp comment
const BadRequestError = require('../../../errors/bad_request')

const notifications = app.services.notification
const user = app.services.user

