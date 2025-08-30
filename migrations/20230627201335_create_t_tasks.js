const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'tasks', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
  table.uuid('branch_id').references('institution_branches.id').nullable().onDelete('CASCADE').defaultTo(null)

  table.string('assignee_id').nullable() // can be `user.id`, but potentially an external identifier like email address, or phone number
  table.string('assigner_id').notNullable() // can be a user, or system component (i.e. workflow)

  table.uuid('workflow_id').references('workflows.id').nullable()
  table.string('activity_id').nullable()
  table.string('activity_token').nullable()

  table.string('created_by_id').notNullable() // can be a user, or system component (i.e. workflow)
  table.string('updated_by_id').notNullable() // can be a user, or system component (i.e. workflow)

  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  table.timestamp('last_reminded_at').nullable()

  table.string('title').notNullable()
  table.string('type').notNullable().defaultTo('generic')
  table.string('status').notNullable().defaultTo('created')
  table.string('remind_every').nullable() // Duration, RRULE or similar strategy (notification entity should reference a task)
  table.timestamp('expires_at').nullable()

  table.jsonb('files').notNullable().defaultTo('{}')

}, () => knex.schema.alterTable('tasks', table => {
  table.index('type', 'idx_tasks_type')
  table.index('status', 'idx_tasks_status')
  table.index('assignee_id', 'idx_tasks_assignee')
// Temp comment
  table.index('assigner_id', 'idx_tasks_assigner')
  table.index('activity_id', 'idx_tasks_activity')
  table.index('created_by_id', 'idx_tasks_created_by')
  table.index('updated_by_id', 'idx_tasks_updated_by')
  table.index('created_at', 'idx_tasks_created_at')
  table.index('updated_at', 'idx_tasks_updated_at')
  table.index('expires_at', 'idx_tasks_expires_at')
