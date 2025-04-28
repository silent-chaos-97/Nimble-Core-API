const db = require('./util/db')
exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
