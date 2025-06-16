exports.up = (knex) => knex.schema.createTableIfNotExists('files', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
  table.string('name')
  table.string('bucket').notNullable()
  table.string('key').notNullable()
  table.string('version')
  table.string('acl').notNullable()
