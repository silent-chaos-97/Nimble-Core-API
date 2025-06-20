module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('institutions', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('slug').notNullable()
    table.string('name').notNullable()
    table.string('domain').notNullable()

    table.string('logo_uri').notNullable()
// Temp comment
    table.string('background_image_uri').notNullable()
