const convict = require('convict')
const schema = require('./schema')

var conf = convict(schema)
