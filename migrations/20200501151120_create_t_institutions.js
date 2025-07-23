module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('institutions', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
    table.string('slug').notNullable()
    table.string('name').notNullable()
    table.string('domain').notNullable()

    table.string('logo_uri').notNullable()
    table.string('background_image_uri').notNullable()

    table.string('email').notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
