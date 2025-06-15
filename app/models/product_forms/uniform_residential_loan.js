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
			})
		})
	),
  // Not sure - https://plaid.com/docs/transactions/ - It's not clear to me how bank accounts are linked or whether we can link bank accounts from other financial institutions
	combinedMonthlyExpenses: Joi.object({
		present: Joi.object({
      // Not sure - User input
			rent: Joi.number(),
      // Not sure - User input - Microbilt UCC (will only apply for loans that have gone to collections)
			firstMortgagePAndI: Joi.number(),
			otherFinancingPAndI: Joi.number(),
      // Not sure - User input
			hazardInsurance: Joi.number(),
      // Attom - /property/expandedProfile - addressVerification/taxes
      // Or calculate based on estimated market value and pull tax rate for state from government website/database/api
			realEstateTaxes: Joi.number(),
      // Not sure - User input
			mortgageInsurance: Joi.number(),
      // Not sure - User input (check Attom ?)
			homeownerAssociationDues: Joi.number(),
      // Calculated values
			otherTotal: Joi.number(),
			total: Joi.number()
		}),
    // Not sure - User
		proposed: Joi.object({
			firstMortgagePAndI: Joi.number(),
			otherFinancingPAndI: Joi.number(),
			hazardInsurance: Joi.number(),
			realEstateTaxes: Joi.number(),
			mortgageInsurance: Joi.number(),
			homeownerAssociationDues: Joi.number(),
			otherTotal: Joi.number(),
			total: Joi.number()
		})
	}),
	assetsAndLiabilities: Joi.object({
		completedJointly: Joi.boolean(),
		assets: Joi.object({
			cashDepositTowardPurchaseHeldBy: Joi.string(),
			cashDepositAmount: Joi.number(),
      // Have it - https://developer.microbilt.com/bankaccountsearch/apis/post/GetReport
			checkingAndSavingsAccounts: Joi.array().items(
				Joi.object({
					owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
					financialInstitutionName: Joi.string(),
					financialInstitutionAddress: Joi.string(),
					accountNumber: Joi.string(),
					balance: Joi.number()
				})
			),
      // Not sure - user
			stocks: Joi.array().items(
				Joi.object({
					owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
					companyName: Joi.string(),
					tickerSymbol: Joi.string(),
					exchange: Joi.string(),
					quantity: Joi.number(),
					currentMarketValue: Joi.number(),
					totalMarketValue: Joi.number()
				})
			),
      // Calculated
			stocksTotalMarketValue: Joi.number(),
      // Not sure - user
			bonds: Joi.array().items(
				Joi.object({
					owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
					issuer: Joi.string(),
					quantity: Joi.number(),
					totalPresentValue: Joi.number()
				})
			),
      // Calculated
			bondsTotalPresentValue: Joi.number(),
      // Not sure - user
			lifeInsurance: Joi.object({
				owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
				faceAmount: Joi.number(),
				netCashValue: Joi.number()
			}),
      // Calculated
			lifeInsuranceTotalNetCashValue: Joi.number(),
      // Calculated
			subtotalLiquidAssets: Joi.number(),
      // Not sure - https://developer.microbilt.com/propertysearch/apis/post/GetReport
			realEstateOwned: Joi.object({
				owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
				marketValue: Joi.number()
			}),
      // Calculated
			realEstateOwnedTotalMarketValue: Joi.number(),
      // Not sure - User
			vestedInterestInRetirementFund: Joi.object({
				owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
				marketValue: Joi.number()
			}),
      // Calculated
			vestedInterestInRetirementFundTotalMarketValue: Joi.number(),
      // Not sure - Microbilt may be able to provide us with Secretary of State records for finding what businesses the user owns. Mark sent us an API for finding private business financial data, but I can't remember what it's called. May be in an email he sent
			newWorthOwnedBusinesses: Joi.object({
				owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
				marketValue: Joi.number()
			}),
			newWorthOwnedBusinessesTotalMarketValue: Joi.number(),
      // Have it - Microbilt
			automobilesOwned: Joi.array().items(
				Joi.object({
					owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
          // Microbilt - Vehicle Search
					make: Joi.string(),
					year: Joi.number(),
          // Microbilt - Vehicle Pricing - Seems pretty inaccurate from my initial assessment
					marketValue: Joi.number()
				})
			),
			automobilesOwnedTotalMarketValue: Joi.number(),
      // Not sure - User
			otherAssets: Joi.array().items(
				Joi.object({
					owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
					type: Joi.string(),
					description: Joi.string(),
					marketValue: Joi.number()
				})
			),
			otherAssetsTotalMarketValue: Joi.number(),
      // Not sure - Microbilt property search / Attom sales history
			ownedRealEstateSchedule: Joi.object({
				properties: Joi.array().items(
					Joi.object({
						address: Joi.string(),
						saleStatus: Joi.string().valid('Sold', 'Pending Sale', 'Rental'),
						propertyType: Joi.string(),
						presentMarketValue: Joi.number(),
						mortgageAndLiensAmount: Joi.number(),
						grossRentalIncome: Joi.number(),
						mortgagePayments: Joi.number(),
						insuranceMaintenanceTaxesAndMiscellaneous: Joi.number(),
						netRentalIncome: Joi.number()
					})
