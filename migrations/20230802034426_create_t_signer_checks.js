const db = require('./util/db')

  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('signer_id').references('signers.id').notNullable().onDelete('CASCADE')
