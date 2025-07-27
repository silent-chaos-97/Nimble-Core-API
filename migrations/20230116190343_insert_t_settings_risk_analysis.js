const ROWS = [
  {
    key: 'scopes',
    schema: { $ref: 'scopes' }
  },
  {
    key: 'financial_indicators',
    schema: { $ref: 'financial_indicators' }
  },
  {
    key: 'risk_analysis',
    schema: { $ref: 'risk_analysis' }
  }]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
    institution_id: inst.id,
    ...setting
