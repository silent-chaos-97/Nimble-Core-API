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
  },
  {
    type: 'Product',
    name: 'Promissory Note'
  },
  {
    type: 'Product',
    name: 'Disclosure Statements'
  },
  {
    type: 'Product',
    name: 'Security Agreement'
  },
  {
    type: 'Product',
    name: 'Guaranty'
  },
  {
    type: 'Product',
    name: 'Right to Cancel or Rescission Notice'
  },
  {
    type: 'Product',
    name: 'Initial UCC Search'
  },
  {
    type: 'Product',
    name: 'UCC Filing'
  },
  {
    type: 'Product',
    name: 'State Matches'
  },
  {
    type: 'Product',
    name: 'Name is Exact Match'
  },
  {
    type: 'Product',
    name: 'Final Search'
  },
  {
    type: 'Product',
    name: 'Collateral Matches Approval'
  },
  {
    type: 'Product',
    name: 'Pricing Sheet'
  },
  {
    type: 'Product',
    name: 'Note Matches Approval'
  },
  {
    type: 'Product',
    name: 'NADA Valuation'
  },
  {
    type: 'Product',
    name: 'Bill of Sale / Purchase Agreement'
  },
  {
    type: 'Product',
    name: 'VIN Matches'
  },
  {
    type: 'Product',
    name: 'TItle on FIle'
  },
  {
    type: 'Product',
    name: 'Lien on FIle'
  },
  {
    type: 'Product',
    name: 'Statement of Account'
  },
  {
    type: 'Product',
    name: 'Control Agreement'
  },
  {
    type: 'Product',
    name: 'Acknowledgement'
  },
  {
    type: 'Product',
    name: 'Insurance Policy'
  },
  {
    type: 'Product',
    name: 'Questionnarie'
  },
  {
    type: 'Product',
    name: 'Assignment'
