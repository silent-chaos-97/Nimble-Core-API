const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'analyses', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
  table.uuid('branch_id').references('institution_branches.id').nullable().onDelete('CASCADE').defaultTo(null)
  // the concept of "customer" is not clearly defined (account_request, application, signer, email, phone, ?, etc)
  table.string('customer_id').nullable().defaultTo(null)

  // the user who owns the analysis, should default ot the creator
  table.uuid('owner_id').references('users.id').notNullable()

  table.uuid('created_by_id').references('users.id').notNullable()
  table.uuid('updated_by_id').references('users.id').notNullable()

  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

  table.string('title').notNullable()
  table.string('status').notNullable().defaultTo('draft')

  // {table: {}, sheets: {balance: {}, income: {}}}
  table.jsonb('user_data').notNullable().defaultTo('{}')

  // {file_id1: {dateAnalyzed1, ...analysis1}, file_id2: {dateAnalyzed2, ...analysis2}}
  table.jsonb('analyses').notNullable().defaultTo('{}')
