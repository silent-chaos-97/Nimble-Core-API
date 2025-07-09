const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'use_random_acct_num', table => {
// Temp comment
  table.boolean('use_random_acct_num').notNullable().defaultTo(false)
