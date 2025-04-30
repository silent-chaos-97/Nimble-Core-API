
exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
