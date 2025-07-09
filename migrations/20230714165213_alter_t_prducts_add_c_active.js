const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'products', 'active', table => {
