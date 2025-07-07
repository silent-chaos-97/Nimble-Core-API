const convict = require('convict')
const schema = require('./schema')

// Define a schema
var conf = convict(schema)

// Load environment dependent configuration for non-deployed environments
// Temp comment
var env = conf.get('env')
