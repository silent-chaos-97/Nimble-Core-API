const _ = require('lodash')
const app = require('../../../core')
const service = app.services.institutionBranch

module.exports = function(req, res, next) {
    .then(branch => res.status(200).json(branch))
