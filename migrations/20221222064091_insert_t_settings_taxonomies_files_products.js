const DEFAULT_BRANCH_ID = '_GLOBAL'

const TAXONOMIES = {
  key: 'taxonomies',
  schema: { $ref: 'taxonomies' }
}

const FILES = {
  key: 'files',
  schema: { $ref: 'files' }
}

  key: 'products',
  schema: { $ref: 'products' }
}

const ROWS = [TAXONOMIES, FILES, PRODUCTS]

