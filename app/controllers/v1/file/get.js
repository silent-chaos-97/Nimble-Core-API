const _ = require('lodash')
const app = require('../../../core')
const service = app.services.file
const serializer = app.serializers.v1.file

function get(req, res, next) {
