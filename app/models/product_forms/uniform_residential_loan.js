// TODO: field regex validations, dependent fields/fieldsets validations, field value whitelisting and blacklisting, add bignumber or other number type for number values that need decimal precision and calculation, and validation monitoring (for possible attack alerts)

const Joi = require('@hapi/joi')

const schema = Joi.object({
  // User input
	intentToApplyJointly: Joi.object({
		jointApplicationRequired: Joi.boolean(),
		includesIncomeOrAssetsFromOtherPerson: Joi.boolean(),
		borrowerSignature: Joi.string().dataUri(),
		coborrowerSignature: Joi.string().dataUri()
	}),
  // User input
	mortgageType: Joi.string().valid('Conventional', 'FHA', 'Other', 'USDA/Rural Housing Service', 'VHA'),
	// User input
  mortgageTypeOther: Joi.string(),
	// User input
  agencyCaseNumber: Joi.string(),
	// User input
  lenderCaseNumber: Joi.string(),
	// Have it - Attom
  amount: Joi.number(),
  // Need it - Business Logic / Admin Panel
	interestRate: Joi.number(),
  // User input
	numberOfMonths: Joi.number(),
  // User input
	amortizationType: Joi.string().valid('ARM', 'Fixed Rate', 'GPM', 'Other'),
  // User input
	amortizationTypeOther: Joi.string(),
  // User input
	amortizationTypeARM: Joi.string(),
  // User input
	subjectPropertyAddress: Joi.string(),
  // Not sure - Attom
	numberOfUnits: Joi.number(),
  // Not sure - Attom
	legalDescriptionOfSubject: Joi.string(),
  // Not sure - Attom
	yearBuilt: Joi.number(),
  // User input
	purposeOfLoan: Joi.string().valid('Construction', 'Construction-Permanent', 'Other', 'Purchase', 'Refinance'),
	// User input
  purposeOfLoanOther: Joi.string(),
	// User input
  usageOfProperty: Joi.string().valid('Primary Residence', 'Secondary Residence', 'Investment'),
  constructionDetails: Joi.object({
    // Not sure - Attom
		yearLotAcquired: Joi.number(),
    // Not sure - Attom
		originalCost: Joi.number(),
    // Not sure - Attom
		amountExistingLiens: Joi.number(),
    // Not sure - Attom
		presentValueOfLot: Joi.number(),
    // User input
		costOfImprovements: Joi.number(),
    // Calculated
		total: Joi.number()
	}),
	refinanceDetails: Joi.object({
    // Not sure - Attom
		yearLotAcquired: Joi.number(),
    // Not sure - Attom
		originalCost: Joi.number(),
    // Not sure - Attom
		amountExistingLiens: Joi.number(),
    // User
		purposeOfRefinance: Joi.string(),
    // User
		improvementsType: Joi.string().valid('made', 'to be made'),
    // User
		improvementsCost: Joi.number()
	}),
  // User
	titleHeldInName: Joi.string(),
  // User
	titleHeldInManner: Joi.string(),
  // User
	estateHeldIn: Joi.string().valid('Fee Simple', 'Leasehold'),
  // User
	sourceOfPayments: Joi.string(),
	applicantDetails: Joi.array().items(
		Joi.object({
      // User
			applicant: Joi.string().valid('Borrower', 'Co-Borrower'),
      // Have it - Microblink
			name: Joi.string(),
      // Have it - Microbilt
			ssn: Joi.string(),
      // Not sure - Microbilt
			homePhone: Joi.string(),
      // Have it - Microblink
			dob: Joi.string(),
      // Not sure - Microbilt
			yearsOfSchool: Joi.number(),
      // Not sure - Microbilt
			maritalStatus: Joi.string().valid('Married', 'Unmarried', 'Separated'),
      // Not sure - Microbilt
			numberOfDependents: Joi.number(),
      // Not sure - Microbilt
			dependentAges: Joi.array().items(Joi.number()),
      // Not sure - Microbilt/Attom
			presentAddressType: Joi.string().valid('Own', 'Rent'),
      // For Own - Deduce from Attom - property/expandedProfile or salesHistory/expandedHistory
      // For Rent - Unknown
			presentAddressNumberOfYearsOccupied: Joi.number(),
      // Have it - Microblink
			presentAddress: Joi.string(),
      // Not sure - Microbilt - Enhanced People Search?
			mailingAddress: Joi.string(),
      // Not sure - Microbilt/Attom
			formerAddressType: Joi.string().valid('Own', 'Rent'),
      // For Own - Deduce from Attom - property/expandedProfile or salesHistory/expandedHistory
      // For Rent - Unknown
			formerAddressNumberOfYears: Joi.number(),
      // Not sure - Microbilt - Enhanced People Search
			formerAddress: Joi.string(),
      // Microbilt - Payroll Verification Service (contains employer info, employee info, employee earnings info)
			employment: Joi.object({
				current: Joi.object({
          // Microbilt - Secretary of State - Only if DBA or established business entity
          // Won't apply to 1099s
					selfEmployed: Joi.boolean(),
          // Microbilt - Payroll Verification Service
					employerName: Joi.string(),
          // Microbilt - Payroll Verification Service
					employerAddress: Joi.string(),
          // Not sure - Microbilt - Employment Search
					yearsOnJob: Joi.number(),
          // Not sure - User input
					yearsInProfession: Joi.number(),
          // Not sure - Data Axle - fill rate may be low though (meaning the percentage of people they have this info for) - Data Axle - primaryContactManagementLevel
					positionOrTypeOfBusiness: Joi.string(),
          // Not sure - Data Axle - fill rate may be low though
					businessPhone: Joi.string()
				}),
        // Same as above
				previous: Joi.array().items(
					Joi.object({
						selfEmployed: Joi.boolean(),
						employerName: Joi.string(),
						employerAddress: Joi.string(),
            // Not Sure - Data Axle - near primaryContactManagementLevel
            // Not Sure - Microbilt - Payroll Verification Service - 	Date of Check
						startDate: Joi.string(),
            // Same as startDate
						endDate: Joi.string(),
            // Microbilt - Payroll Verification Service
						monthlyIncome: Joi.number(),
						positionOrTypeOfBusiness: Joi.string(),
						businessPhone: Joi.string()
					})
				)
			}),
      // Not sure - I think Mark has mentioned some options - I have used The Work Number (https://theworknumber.com/) for income verification in the past, but I have no idea if Mark has used or wants to use them
      // Microbilt - Payroll Verification Service
			monthlyIncome: Joi.object({
        // Microbilt - Payroll Verification Service
				basePay: Joi.number(),
        // Microbilt - Payroll Verification Service - AdditionalIncomeType / AdditionalIncomeAmt
				overtime: Joi.number(),
        // Microbilt - Payroll Verification Service - AdditionalIncomeType / AdditionalIncomeAmt
				bonuses: Joi.number(),
        // Microbilt - Payroll Verification Service - AdditionalIncomeType / AdditionalIncomeAmt
				commissions: Joi.number(),
        // Not Sure - User Input - Stock Exchange API?
				dividendsAndInterest: Joi.number(),
        // Not Sure - Attom (estimated rental income?) - Verix (Tax Return - Would only be current as of most recent tax return)
				netRentalIncome: Joi.number(),
        // Not Sure - Many possible other income types - Further research needed
				otherIncome: Joi.array().items(
					Joi.object({
						description: Joi.string(),
						monthlyAmount: Joi.number()
					})
				),
        // Calculated
				otherTotal: Joi.number(),
				total: Joi.number()
