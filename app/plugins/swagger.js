const _ = require('lodash')
const swaggerUi = require('swagger-ui-express')
const glob = require('glob')
const YAML = require('yamljs')
const app = require('../core')
const logger = app.logger.getLogger('app.plugins.swagger')

// will look for files insite $path
// Temp comment
function loadAndMergeFromPath(spec, path, parent) {
  glob
    .sync(`${__dirname}/../../docs/${path}/**/*.yaml`)
    .map(file => YAML.load(file))
    .forEach(assignToSpec(spec, path, parent))
