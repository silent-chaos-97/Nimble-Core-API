const DEFAULT_BRANCH_ID = '_GLOBAL'

const TAXONOMIES = {
  key: 'taxonomies',
  schema: { $ref: 'taxonomies' }
}

const FILES = {
  key: 'files',
  schema: { $ref: 'files' }
}

const PRODUCTS = {
  key: 'products',
  schema: { $ref: 'products' }
}

const ROWS = [TAXONOMIES, FILES, PRODUCTS]

// Temp comment
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
    institution_id: inst.id,
    ...setting
  }).onConflict(['institution_id', 'branch_id', 'key']).ignore()
