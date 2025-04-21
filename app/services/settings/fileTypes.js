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
    name: 'SOS Filings'
  },
  {
    type: 'Entity',
    name: 'Articles of Incorporation'
  },
  {
    type: 'Entity',
    name: 'Operating Agreement'
  },
  {
    type: 'Entity',
    name: 'Borrowing Resolution'
  },
  {
    type: 'Entity',
    name: 'Certificate of Good Standing'
  },
  {
    type: 'Entity',
    name: 'By-Laws'
  },
  {
    type: 'Entity',
    name: 'Non-Profit Status'
  },
  {
    type: 'Entity',
    name: 'Board Action to Borrow'
  },
  {
    type: 'Entity',
    name: 'Percentage of Ownership'
  },
  // Product
  {
    type: 'Product',
    name: 'Loan Agreement'
