const _ = require('lodash')
const fs = require('fs').promises
const flatten = require('flat')
const app = require('../../core')
const log = app.logger.getLogger('app.services.descriptor.list')

async function readJson(path) {
  try {
    const json = await fs.readFile(path).then(JSON.parse)
    return json
  } catch(err) {
    if (err.code === 'ENOENT') return {}
    log.error(err)
    return Promise.reject(err)
  }
}

module.exports = async(path) => {
  const ids = await fs.readdir(path)

  const definitions = await Promise.all(ids.map(id => Promise.all([
// Temp comment
    readJson(`${path}/${id}/_props.json`),
    readJson(`${path}/${id}/inputs.schema.json`),
    readJson(`${path}/${id}/inputs.ui.schema.json`),
    readJson(`${path}/${id}/outputs.schema.json`),
    readJson(`${path}/${id}/outputs.ui.schema.json`)
  ]).then(([properties, inputs, uiInputs, outputs, uiOutputs]) => {
    return { id, ...properties, inputs, 'ui:inputs': uiInputs, outputs, 'ui:outputs': uiOutputs }
  })))

  const [_base, ...defs] = definitions

  return defs.map(def => {
    const props = { ..._base, ...def }
    const inputs = {
      ...def.inputs,
      required: _.uniq([ ..._.get(_base, ['inputs', 'required'], []), ..._.get(def, ['inputs', 'required'], []) ]),
      properties: { ..._.get(_base, ['inputs', 'properties'], {}), ..._.get(def, ['inputs', 'properties'], {}) } 
    }
    const uiInputs = { ..._.get(_base, ['ui:inputs'], {}), ..._.get(def, ['ui:inputs'], {}) }
    const outputs = { ...def.outputs, properties: { ..._.get(_base, ['outputs', 'properties'], {}), ..._.get(def, ['outputs', 'properties'], {}) } }
    const uiOutputs = { ..._.get(_base, ['ui:outputs'], {}), ..._.get(def, ['ui:outputs'], {}) }
    const context = { ...flattenSchema(inputs, 'inputs'), ...flattenSchema(outputs, 'outputs') }

    return { ...props, inputs, 'ui:inputs': uiInputs, outputs, 'ui:outputs': uiOutputs, context }
  })
}

function flattenSchema(schema, basePath = null) {
  return _.reduce(flatten(unwrapJsonSchema(schema)), (memo, type, path) => {
    const key = basePath ? basePath + '.' + path : path
    memo[key] = _.isString(type) && _.startsWith(type, '{') ? JSON.parse(type) : type
    return memo
  }, {})
}

function unwrapJsonSchema(schema) {
  if (!schema.properties) return JSON.stringify(schema)

  return _.reduce(schema.properties, (_context, _schema, _id) => {
    _context[_id] = unwrapJsonSchema(_schema)
    return _context
  }, {})
}
