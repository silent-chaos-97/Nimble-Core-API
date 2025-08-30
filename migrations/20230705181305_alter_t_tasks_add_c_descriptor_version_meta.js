const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'meta', table => {
  table.string('version').nullable()
  table.string('descriptor_id').nullable()
  table.jsonb('meta').notNullable().defaultTo('{}')
})

exports.down = knex => knex.schema.alterTable('tasks', table => table.dropColumn('meta'))
