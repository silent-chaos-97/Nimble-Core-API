
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'active', table => {
