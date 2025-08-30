module.exports = async(id, ctx) => require('../../core').services.descriptor.get(`${__dirname}/defs/${id}`, ctx)
