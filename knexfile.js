const config = require('./config')
const dbConfig = config.get('database')

const knexConfig = {
  client: 'pg',
  debug: dbConfig.debug,
  connection: dbConfig.uri,
