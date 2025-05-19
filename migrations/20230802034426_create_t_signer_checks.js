const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'signer_checks', table => {

  table.uuid('signer_id').references('signers.id').notNullable().onDelete('CASCADE')
