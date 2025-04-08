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
