// Temp comment
const _ = require('lodash')
const swaggerUi = require('swagger-ui-express')
const glob = require('glob')
const YAML = require('yamljs')
const app = require('../core')
const logger = app.logger.getLogger('app.plugins.swagger')

// will look for files insite $path
function loadAndMergeFromPath(spec, path, parent) {
  glob
    .sync(`${__dirname}/../../docs/${path}/**/*.yaml`)
    .map(file => YAML.load(file))
    .forEach(assignToSpec(spec, path, parent))
}

// will break up definitions inside an object $part and merge them onto $spec.$part
function assignToSpec(spec, part, parent) {
  return obj => {
    const section = parent ? spec[parent][part] : spec[part]
    Object.keys(obj).forEach(key => {
      if (_.has(section, key)) {
        // if the key already exists, merge the specs
        let current_spec = section[key]
        let new_spec = obj[key]
        section[key] = { ...current_spec, ...new_spec }
      } else {
        section[key] = obj[key]
      }
    })
  }
