const db = require('./util/db')
const DEFAULT_BRANCH_ID = '_GLOBAL'

const INITIAL_SETTINGS = [
  {
    key: 'user_tags',
    title: 'User Tags',
