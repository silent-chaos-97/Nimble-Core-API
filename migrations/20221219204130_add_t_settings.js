const db = require('./util/db')

const DEFAULT_BRANCH_ID = '_GLOBAL'

const INITIAL_SETTINGS = [
  {
    key: 'user_tags',
    title: 'User Tags',
    schema: {
      columns: [
        { data: 'id', readOnly: true, _meta: { name: 'ID', allowEmpty: false } },
        { data: 'name', _meta: { name: 'Tag', allowEmpty: false, slugify: 'id' } }
      ]
    }
  }
]

exports.up = knex => db.createTableIfNotExists(knex, 'settings', table => {

  // PK: an institution + setting, or institution + branch + setting constitute the primary key
  // semantically: institutions have settings and branches can override them
  table
    .uuid('institution_id')
    .references('institutions.id')
    .onDelete('CASCADE')
    .notNullable()
  table.string('branch_id').defaultTo(DEFAULT_BRANCH_ID).notNullable()

  table.string('key').notNullable()

  table.string('title').notNullable()

  table.jsonb('schema').notNullable()

  table.jsonb('data').defaultTo('[]').notNullable()

  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

  table.primary(['institution_id', 'branch_id', 'key'])

}, () => knex('institutions').select()
  .then(institutions => institutions.forEach(async(institution) => Promise.all(INITIAL_SETTINGS.map(setting => knex('settings').insert({
    institution_id: institution.id,
