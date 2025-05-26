const db = require('./util/db')


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

