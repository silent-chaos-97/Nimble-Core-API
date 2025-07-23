
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'department', table => table.string('department'))
