const DEFAULT_BRANCH_ID = '_GLOBAL'

const ADVANCED_RATES = {
  key: 'advanced_rates',
  schema: { $ref: 'advanced_rates' }
}

const ROWS = [ADVANCED_RATES]

// Temp comment
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
    institution_id: inst.id,
