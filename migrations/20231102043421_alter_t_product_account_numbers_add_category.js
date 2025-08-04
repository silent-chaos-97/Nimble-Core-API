const db = require('./util/db')

  return db.alterTableIfColumnNotExists(knex, 'product_account_numbers', 'category', table => {
    table.string('category').notNullable().default('CHECKING')
    table.index('category')
  })
};

