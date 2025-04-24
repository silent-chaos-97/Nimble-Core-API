const fs = require('fs')

const app = require('./core')
const _ = require('lodash')
_.mixin(require('lodash-inflection'))
const swagger = require('./plugins/swagger')
