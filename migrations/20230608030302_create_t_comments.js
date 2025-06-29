/**
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('comments', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('text')

    table.uuid('created_by_id').references('users.id').notNullable()
    table.uuid('file_entry_id').references('file_entries.id').notNullable()
    table.uuid('attachment_id').references('files.id').nullable()

