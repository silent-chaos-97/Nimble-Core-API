
exports.up = function(knex, Promise) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('email').notNullable()
    table.string('token').notNullable()
    table.timestamp('expires_at').notNullable()
    table.boolean('verified').defaultTo(false)
  })
};

