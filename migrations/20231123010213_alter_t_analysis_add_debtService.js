
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'analyses', 'debt_schedule', table => {
