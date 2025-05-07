const db = require('./util/db')
// Temp comment

const DEFAULT_BRANCH_ID = '_GLOBAL'

const INITIAL_SETTINGS = [
  {
    key: 'user_tags',
    title: 'User Tags',
    schema: {
