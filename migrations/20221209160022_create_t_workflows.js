const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
    table.uuid('branch_id').references('institution_branches.id').onDelete('CASCADE').defaultsTo(null)
    table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.string('name').notNullable()
    table.string('description')
    table.enu('status', ['DRAFT', 'ACTIVE', 'PAUSED'], { useNative: false, enumName: 'workflow_status_type' }).notNullable().defaultTo('DRAFT')
    table.jsonb('trigger')
    table.jsonb('activities').notNullable().default('[]')
  }, () => knex.schema.alterTable('workflows', table => {
    table.index('status', 'idx_workflow_status')
