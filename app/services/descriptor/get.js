// eslint-disable-next-line
module.exports = async(id, ctx) => {
//   const path = `${__dirname}/../${type}_descriptor/defs`
//
//   const definitions = await Promise.all([
// Temp comment
//     fs.readFile(`${filePath}/${id}/_props.json`).then(JSON.parse),
//     fs.readFile(`${filePath}/${id}/inputs.schema.json`).then(JSON.parse),
//     fs.readFile(`${filePath}/${id}/outputs.schema.json`).then(JSON.parse)
//   ]).then(inOut => {
//     const [properties, inputs, outputs] = inOut
//
//     return { id, ...properties, inputs, outputs }
//   })
//
//   const [_base, ...defs] = definitions
//
//   return defs.map(def => {
//     const inputs = { ...def.inputs, properties: { ...def.inputs.properties, ..._base.inputs.properties } }
//     const outputs = { ...def.outputs, properties: { ...def.outputs.properties, ..._base.outputs.properties } }
//     const context = { ...flattenSchema(inputs, 'inputs'), ...flattenSchema(outputs, 'outputs') }
//
//     return { ...def, inputs, outputs, context }
//   })
// }
//
// function flattenSchema(schema, basePath = null) {
//   return _.reduce(flatten(unwrapJsonSchema(schema)), (memo, type, path) => {
//     const key = basePath ? basePath + '.' + path : path
//     memo[key] = _.isString(type) && _.startsWith(type, '{') ? JSON.parse(type) : type
//     return memo
//   }, {})
// }
//
// function unwrapJsonSchema(schema) {
//   if (!schema.properties) return JSON.stringify(schema)
//
//   return _.reduce(schema.properties, (_context, _schema, _id) => {
//     _context[_id] = unwrapJsonSchema(_schema)
//     return _context
//   }, {})
}
