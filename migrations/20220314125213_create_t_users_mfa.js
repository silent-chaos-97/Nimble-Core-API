
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users_mfa', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
    table.string('email').notNullable()
    table.string('token').notNullable()
    table.timestamp('expires_at').notNullable()
    table.boolean('verified').defaultTo(false)
  })
};

