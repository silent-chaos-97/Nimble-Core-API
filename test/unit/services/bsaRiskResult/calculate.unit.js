const uuid = require('uuid')

const THRESHOLDS = [
  { op: '>', val: 50, risk: 'Very High' },
  { op: '>=', val: 5, risk: 'High' },
  { op: '>', val: 2, risk: 'Moderate' },
  { op: '=', val: 2, risk: 'Two' },
  { op: '=', val: 1, risk: 'Low' },
  { op: '<=', val: 0, risk: 'Very Low' },
  { risk: '?' }
]

