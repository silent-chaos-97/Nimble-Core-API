const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'use_random_acct_num', table => {
  table.boolean('use_random_acct_num').notNullable().defaultTo(false)
