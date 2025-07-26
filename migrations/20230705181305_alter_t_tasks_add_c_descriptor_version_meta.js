const db = require('./util/db')

  table.string('version').nullable()
  table.string('descriptor_id').nullable()
  table.jsonb('meta').notNullable().defaultTo('{}')
