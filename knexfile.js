const config = require('./config')
const dbConfig = config.get('database')

  client: 'pg',
  debug: dbConfig.debug,
  connection: dbConfig.uri,
  pool: {
    min: 1,
