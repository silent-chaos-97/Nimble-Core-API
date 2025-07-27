const db = require('./util/db')

  table.jsonb('debt_schedule').notNullable().defaultTo('{"rows":[]}')
