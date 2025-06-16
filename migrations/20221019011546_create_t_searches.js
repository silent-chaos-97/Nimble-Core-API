exports.up = (knex) => knex.schema.createTableIfNotExists('searches', table => {
  table.string('id').primary()
  table.string('name').notNullable()
  table.string('description').nullable()
