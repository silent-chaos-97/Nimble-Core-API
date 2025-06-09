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
  },
  {
    type: 'Product',
    name: 'Stock Certificate'
  },
  {
    type: 'Product',
    name: 'Names Match'
  },
  {
    type: 'Product',
    name: 'Not Retricted or UTMA'
  },
  {
    type: 'Product',
    name: 'Stock Power'
  },
  {
    type: 'Product',
    name: 'Vesting Correct'
  },
  {
    type: 'Product',
    name: 'Filed Copy - Bank'
  },
  {
    type: 'Product',
    name: 'Appraisal'
  },
  {
    type: 'Product',
    name: 'Appraisal Reviewed'
  },
  {
    type: 'Product',
    name: 'Preliminary Title Opinon'
  },
  {
    type: 'Product',
    name: 'Final Title Opinoin'
  },
  {
    type: 'Product',
    name: 'Title Committment'
  },
  {
    type: 'Product',
    name: 'Title Insurance'
  },
  {
    type: 'Product',
    name: 'Title Work Reviewed'
  },
  {
    type: 'Product',
    name: 'Flood Certification'
  },
  {
    type: 'Product',
    name: 'Flood Insurance'
  },
  {
    type: 'Product',
    name: 'Zones Match'
  },
  {
    type: 'Product',
    name: 'Collateral Inspection'
  },
  {
    type: 'Product',
    name: 'Environmental Risk Assessment'
  },
  {
    type: 'Product',
    name: 'Phase 1 Report'
  },
  {
    type: 'Product',
    name: 'Phase 2 Report'
  },
  {
    type: 'Product',
    name: 'Copy of Lease'
  },
  {
    type: 'Product',
