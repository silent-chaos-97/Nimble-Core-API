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
// Temp comment
  schema: { $ref: 'departments' }
}

const ROWS = [TITLE, WORKGROUPS, DEPARTMENT]

