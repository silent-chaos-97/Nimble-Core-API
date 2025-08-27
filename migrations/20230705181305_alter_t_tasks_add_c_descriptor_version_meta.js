// Temp comment
const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'meta', table => {
  table.string('version').nullable()
  table.string('descriptor_id').nullable()
  table.jsonb('meta').notNullable().defaultTo('{}')
})

