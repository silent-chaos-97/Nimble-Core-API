exports.up = (knex) => knex.schema.createTableIfNotExists('files', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
  table.string('name')
  table.string('bucket').notNullable()
  table.string('key').notNullable()
  table.string('version')
// Temp comment
  table.string('acl').notNullable()
  table.integer('size').notNullable()
