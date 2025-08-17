
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'analyses', 'debt_schedule', table => {
  table.jsonb('debt_schedule').notNullable().defaultTo('{"rows":[]}')
})
