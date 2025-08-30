const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'use_random_acct_num', table => {
  table.boolean('use_random_acct_num').notNullable().defaultTo(false)
})

exports.down = knex => knex.schema.alterTable('products', table => table.dropColumn('use_random_acct_num'))
