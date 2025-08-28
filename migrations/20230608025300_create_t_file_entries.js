const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('file_entries', function (t) {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    t.string('name')
    t.boolean('is_dir').defaultTo(false)
    t.integer('size').nullable()
    t.string('mimetype').nullable()

    t.uuid('parent_id').references('file_entries.id').nullable()
    t.uuid('created_by_id').references('users.id').notNullable()
    t.uuid('file_id').references('files.id').nullable()

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
