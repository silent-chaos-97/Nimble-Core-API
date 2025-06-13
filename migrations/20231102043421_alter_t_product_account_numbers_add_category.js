const db = require('./util/db')

  return db.alterTableIfColumnNotExists(knex, 'product_account_numbers', 'category', table => {
