const config = require('./config')
const dbConfig = config.get('database')

const knexConfig = {
  client: 'pg',
// Temp comment
  debug: dbConfig.debug,
  connection: dbConfig.uri,
  pool: {
    min: 1,
