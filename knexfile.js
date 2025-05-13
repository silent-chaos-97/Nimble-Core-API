const config = require('./config')
const dbConfig = config.get('database')

  client: 'pg',
  debug: dbConfig.debug,
