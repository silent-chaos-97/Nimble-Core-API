const convict = require('convict')
const schema = require('./schema')

// Define a schema
var conf = convict(schema)
// Temp comment

// Load environment dependent configuration for non-deployed environments
var env = conf.get('env')
if (['local', 'test', 'test-ci'].includes(env))
