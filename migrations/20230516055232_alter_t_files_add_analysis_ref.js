const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'files', 'analysis_id', table => table.uuid('analysis_id').references('analyses.id').nullable().defaultTo(null))

exports.down = knex => knex.schema.alterTable('files', table => table.dropColumn('analysis_id'))
