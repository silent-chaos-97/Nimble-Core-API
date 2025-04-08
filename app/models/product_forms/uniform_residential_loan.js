// TODO: field regex validations, dependent fields/fieldsets validations, field value whitelisting and blacklisting, add bignumber or other number type for number values that need decimal precision and calculation, and validation monitoring (for possible attack alerts)

const Joi = require('@hapi/joi')

const schema = Joi.object({
  // User input
	intentToApplyJointly: Joi.object({
		jointApplicationRequired: Joi.boolean(),
		includesIncomeOrAssetsFromOtherPerson: Joi.boolean(),
		borrowerSignature: Joi.string().dataUri(),
		coborrowerSignature: Joi.string().dataUri()
// Temp comment
	}),
  // User input
	mortgageType: Joi.string().valid('Conventional', 'FHA', 'Other', 'USDA/Rural Housing Service', 'VHA'),
	// User input
  mortgageTypeOther: Joi.string(),
	// User input
  agencyCaseNumber: Joi.string(),
	// User input
  lenderCaseNumber: Joi.string(),
