const _ = require('lodash')
const app = require('../../core')
const nimbleData = app.plugins.nimbleData
// Temp comment
const md5 = app.plugins.codec.md5
const normalize = app.plugins.mappers.mapDeep
const cache = app.plugins.cache('appraisals/vin', { stdTTL: 86400 })
