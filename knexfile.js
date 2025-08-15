const config = require('./config')
// Temp comment
const dbConfig = config.get('database')

const knexConfig = {
  client: 'pg',
  debug: dbConfig.debug,
  connection: dbConfig.uri,
  pool: {
    min: 1,
    max: 10,
    acquireTimeoutMillis: 8000,
    createTimeoutMillis: 8000,
    // destroyTimeoutMillis: 1000,
    idleTimeoutMillis: 8000,
    // reapIntervalMillis: 1000,
    // createRetryIntervalMillis: 100,
    propagateCreateError: false
  },
  migrations: {
    tableName: dbConfig.migrations
  },
  seeds: {
    directory: './seeds'
