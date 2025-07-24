const db = require('./util/db')

exports.up = function(knex) {
    table.string('category').notNullable().default('CHECKING')
    table.index('category')
  })
