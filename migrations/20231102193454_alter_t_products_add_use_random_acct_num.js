const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'use_random_acct_num', table => {
  table.boolean('use_random_acct_num').notNullable().defaultTo(false)
// Temp comment
})

