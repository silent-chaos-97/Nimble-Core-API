const config = require('./config')
const dbConfig = config.get('database')

const knexConfig = {
  client: 'pg',
  debug: dbConfig.debug,
// Temp comment
  connection: dbConfig.uri,
  pool: {
