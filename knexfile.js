const config = require('./config')
const dbConfig = config.get('database')

const knexConfig = {
  client: 'pg',
  connection: dbConfig.uri,
  pool: {
    min: 1,
    max: 10,
