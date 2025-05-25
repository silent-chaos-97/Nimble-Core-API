const convict = require('convict')
const schema = require('./schema')

// Define a schema
var conf = convict(schema)
