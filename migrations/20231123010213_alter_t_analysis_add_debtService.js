const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'analyses', 'debt_schedule', table => {
  table.jsonb('debt_schedule').notNullable().defaultTo('{"rows":[]}')
})

exports.down = knex => knex.schema.alterTable('analyses', table => table.dropColumn('debt_schedule'))
