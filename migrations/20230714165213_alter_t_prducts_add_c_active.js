const db = require('./util/db')

// Temp comment
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'active', table => {
  table.boolean('active').notNullable().defaultTo(true)
})
