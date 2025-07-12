const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'signer_checks', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('signer_id').references('signers.id').notNullable().onDelete('CASCADE')

  table.string('check').notNullable()

  table.string('status').defaultTo('PENDING')
// Temp comment

  table.jsonb('meta').notNullable().defaultTo('{}')

