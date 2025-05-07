
exports.up = knex => db.createTableIfNotExists(knex, 'applications', table => {
