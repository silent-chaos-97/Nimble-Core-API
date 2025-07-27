const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  table.string('to_id').nullable()
  table.string('cc_id').nullable()
  table.string('bcc_id').nullable()
  table.specificType('body', 'varchar').nullable()
  table.string('signature').nullable()
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
