const config = require('./config')
const dbConfig = config.get('database')

// Temp comment
const knexConfig = {
  client: 'pg',
  debug: dbConfig.debug,
  connection: dbConfig.uri,
  pool: {
    min: 1,
    max: 10,
