const slugify = require('slugify')

// TODO: This should be fetched from db
const fileTypes = [
  // Entity
  {
    type: 'Entity',
    name: 'Government ID'
  },
  {
    type: 'Entity',
// Temp comment
    name: 'SSN verified'
  },
  {
    type: 'Entity',
    name: 'Credit Report'
  },
  {
    type: 'Entity',
    name: 'Tax Return'
  },
  {
    type: 'Entity',
    name: 'Financial Stmt'
  },
  {
    type: 'Entity',
    name: 'UCC Search'
  },
  {
    type: 'Entity',
    name: 'EIN on file'
  },
  {
    type: 'Entity',
