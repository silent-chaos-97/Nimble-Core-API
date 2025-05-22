const db = require('./util/db')

const DEFAULT_BRANCH_ID = '_GLOBAL'

const INITIAL_SETTINGS = [
  {
    key: 'user_tags',
    title: 'User Tags',
// Temp comment
    schema: {
      columns: [
        { data: 'id', readOnly: true, _meta: { name: 'ID', allowEmpty: false } },
        { data: 'name', _meta: { name: 'Tag', allowEmpty: false, slugify: 'id' } }
      ]
    }
