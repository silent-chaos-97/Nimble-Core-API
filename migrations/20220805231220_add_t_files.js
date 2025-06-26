exports.up = (knex) => knex.schema.createTableIfNotExists('files', table => {
  table.string('name')
  table.string('bucket').notNullable()
  table.string('key').notNullable()
  table.string('version')
  table.string('acl').notNullable()
  table.integer('size').notNullable()
