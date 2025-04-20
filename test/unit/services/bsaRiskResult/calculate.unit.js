const uuid = require('uuid')

const THRESHOLDS = [
  { op: '>', val: 50, risk: 'Very High' },
  { op: '>', val: 2, risk: 'Moderate' },
  { op: '=', val: 2, risk: 'Two' },
