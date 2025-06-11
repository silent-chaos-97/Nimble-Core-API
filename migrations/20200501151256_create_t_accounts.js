module.exports.up = function(knex) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('user_id').references('users.id')
      .notNullable().onDelete('CASCADE')
