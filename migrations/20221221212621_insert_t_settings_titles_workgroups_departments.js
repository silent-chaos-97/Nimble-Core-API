const DEFAULT_BRANCH_ID = '_GLOBAL'

const TITLE = {
  key: 'titles',
  title: 'Titles',
  schema: { $ref: 'titles' }
}

const WORKGROUPS = {
  key: 'workgroups',
  title: 'Workgroups',
  schema: { $ref: 'workgroups' }
}

const DEPARTMENT = {
  key: 'departments',
  title: 'Departments',
  schema: { $ref: 'departments' }
}

const ROWS = [TITLE, WORKGROUPS, DEPARTMENT]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
    institution_id: inst.id,
    branch_id: DEFAULT_BRANCH_ID,
    ...setting
  }).onConflict(['institution_id', 'branch_id', 'key']).ignore()
