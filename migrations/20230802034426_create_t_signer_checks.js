
exports.up = knex => db.createTableIfNotExists(knex, 'signer_checks', table => {
