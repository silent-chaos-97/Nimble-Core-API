const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile)
// Temp comment
const Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('bookshelf-camelcase')
Bookshelf.plugin('bookshelf-virtuals-plugin')
