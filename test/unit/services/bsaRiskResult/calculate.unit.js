const uuid = require('uuid')
const THRESHOLDS = [
  { op: '>', val: 50, risk: 'Very High' },
  { op: '>=', val: 5, risk: 'High' },
