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
    name: 'Landlord Lien Waiver'
  },
  {
    type: 'Product',
    name: 'Tenant Estoppel'
  },
  {
    type: 'Product',
    name: 'Pre-Construction Site Inspection'
  },
  {
    type: 'Product',
    name: 'Soil Tests'
  },
  {
    type: 'Product',
    name: 'Plans / Specs Reviewed'
  },
  {
    type: 'Product',
    name: 'Detailed Budget'
  },
  {
    type: 'Product',
    name: 'Copy of Contract'
  },
  {
    type: 'Product',
    name: 'Assignment of Contract'
  },
  {
    type: 'Product',
    name: 'Assignment of Arch. Con.'
  },
  {
    type: 'Product',
    name: 'Market Feasibility'
  },
  {
    type: 'Product',
    name: 'List of Major Subs'
  },
  {
    type: 'Product',
    name: 'Zoning OK'
  },
  {
    type: 'Product',
    name: 'Building Permit'
  },
  {
    type: 'Product',
    name: 'Builder’s Risk Insurance'
  },
  {
    type: 'Product',
    name: 'Liability / Work Comp. Ins.'
  },
  {
    type: 'Product',
    name: 'Pre-Construction Affidavit'
  },
  {
    type: 'Product',
    name: 'Loan Agreement'
  },
  {
    type: 'Product',
    name: 'Lot Release Agreement'
  },
  {
    type: 'Product',
    name: 'Commitment for Permanent Financing'
  },
  {
    type: 'Product',
    name: 'Application'
  },
  {
    type: 'Product',
    name: 'Reimbursement'
  },
  {
    type: 'Product',
    name: 'Letter'
  },
  {
    type: 'Product',
    name: 'Added to Call Report'
  },
  {
    type: 'Product',
    name: 'Account Application Form'
  },
  {
    type: 'Product',
    name: 'Signature Card'
  },
  {
    type: 'Product',
    name: 'Terms and Conditions'
  },
  {
    type: 'Product',
    name: 'Deposit Account Agreement'
  },
  {
    type: 'Product',
    name: 'Privacy Policy'
  },
  {
    type: 'Product',
    name: 'Overdraft Protection Agreement'
  },
  {
    type: 'Product',
    name: 'Credit Card Agreement'
  },
  {
    type: 'Product',
    name: 'Cardholder Agreement or Cardholder Terms'
  },
  {
    type: 'Product',
    name: 'Cardholder Disclosures'
  },
  {
    type: 'Product',
    name: 'Privacy Policy'
  },
  {
    type: 'Product',
    name: 'Balance Transfer Agreement'
  },
  {
    type: 'Product',
    name: 'Rewards Program Agreement'
  },
  {
    type: 'Product',
    name: 'Additional Cardholder Agreement'
  },
  // Disclosures
  {
    type: 'Disclosures',
    name: 'Credit Card Features'
  },
  {
    type: 'Disclosures',
    name: 'Interest Rates'
  },
  {
    type: 'Disclosures',
    name: 'Fees and Charges'
  },
  {
    type: 'Disclosures',
    name: 'Billing and Payment Terms'
  },
  {
    type: 'Disclosures',
    name: 'Credit Limit'
  },
  {
    type: 'Disclosures',
    name: 'Rewards Program'
  },
  {
    type: 'Disclosures',
    name: 'Balance Transfers'
  },
  {
    type: 'Disclosures',
    name: 'Fraud Protection and Security'
  },
  {
    type: 'Disclosures',
    name: 'Credit Card Use'
  },
  {
    type: 'Disclosures',
    name: 'Changes to Terms and Conditions'
  },
  {
    type: 'Disclosures',
    name: 'Dispute Resolution'
  },
  {
    type: 'Disclosures',
    name: 'Credit Reporting'
  },
  {
    type: 'Disclosures',
    name: 'Governing Law'
  },
  {
    type: 'Disclosures',
    name: 'Loan Amount and Purpose'
  },
  {
    type: 'Disclosures',
    name: 'Interest Rate:'
  },
  {
    type: 'Disclosures',
    name: 'Repayment Terms'
  },
  {
    type: 'Disclosures',
    name: 'Monthly Payment Amount'
  },
  {
    type: 'Disclosures',
    name: 'Fees and Charges'
  },
  {
    type: 'Disclosures',
    name: 'Collateral or Guarantees'
  },
  {
    type: 'Disclosures',
    name: 'Default and Remedies'
  },
  {
    type: 'Disclosures',
    name: 'Credit Reporting'
  },
  {
    type: 'Disclosures',
    name: 'Early Repayment and Prepayment'
  },
  {
    type: 'Disclosures',
    name: 'Dispute Resolution'
  },
  {
    type: 'Disclosures',
    name: 'Changes to Terms and Conditions'
  },
  {
    type: 'Disclosures',
    name: 'Governing Law'
  },
  {
    type: 'Disclosures',
    name: 'Account information'
  },
  {
    type: 'Disclosures',
    name: 'Eligibility Requirements'
  },
  {
    type: 'Disclosures',
    name: 'Minimum Balance Requirements'
  },
  {
    type: 'Disclosures',
    name: 'Fees and Charges'
  },
  {
    type: 'Disclosures',
    name: 'Interest Rates'
  },
  {
    type: 'Disclosures',
    name: 'Transaction Limits'
  },
  {
    type: 'Disclosures',
    name: 'Account Closure'
  },
  {
    type: 'Disclosures',
    name: 'Liability and Security'
  },
  {
    type: 'Disclosures',
    name: 'Dispute Resolution'
  },
  {
    type: 'Disclosures',
    name: 'Changes to Terms and Conditions'
  },
  {
    type: 'Disclosures',
    name: 'Governing Law'
  },
  {
    type: 'Disclosures',
    name: 'Credit Reporting'
  },
  // Applications
  {
    type: 'Applications',
    name: 'Loan Application - Business'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Individual'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Guarantor - Business'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Guarantor - Individual'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Modification - Business'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Modification - Individual'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Renewal - Business'
  },
  {
    type: 'Applications',
    name: 'Loan Application - Renewal - Individual'
  },
  {
    type: 'Applications',
    name: 'Deposit Application - Individual'
  },
  {
    type: 'Applications',
    name: 'Deposit Application - Business'
  },
  {
    type: 'Applications',
    name: 'Credit Card Application - Individual'
  },
