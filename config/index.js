const convict = require('convict')
const schema = require('./schema')

// Define a schema
var conf = convict(schema)

var env = conf.get('env')
if (['local', 'test', 'test-ci'].includes(env))
  conf.loadFile('./config/' + (process.env.CI ? 'test-ci' : env) + '.json')

// Perform validation
conf.validate({ allowed: 'strict' })
