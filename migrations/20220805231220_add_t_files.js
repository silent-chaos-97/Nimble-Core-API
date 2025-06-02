exports.up = (knex) => knex.schema.createTableIfNotExists('files', table => {
// Temp comment
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
  table.string('name')
  table.string('bucket').notNullable()
  table.string('key').notNullable()
