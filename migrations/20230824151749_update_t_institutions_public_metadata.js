const publicMetadata = {
  _: {
    thresholds: [
      {
        op: '>=',
        val: 7,
        risk: 'High'
      },
      {
        op: '>=',
        val: 5,
        risk: 'Moderate'
      },
      {
        risk: 'Low'
      }
    ]
  },
  hearAbout: {
    text: 'How did you hear about Central Bank?',
    type: 'string',
    order: 3,
    regex: '^[a-zA-Z0-9- \'\']*$',
    default: null,
    subtype: 'text',
    required: true,
    dependsOn: {
      milesAway: 'yes'
    },
    maxLength: 255
  },
  milesAway: {
    enum: [
      'yes',
      'no'
    ],
    text: 'Is there anyone on the application that lives further than 50 miles from one of our locations?',
    type: 'string',
    order: 2,
    score: {
      no: 2,
      yes: 2
    },
    default: 'no',
    subtype: 'enum',
    required: true
  },
  usCitizen: {
    enum: [
      'yes',
      'no'
    ],
    text: 'Are you or any others listed on the account not U.S. citizens?',
    type: 'string',
    order: 0,
    score: {
      no: 2,
      yes: 2
    },
    default: 'no',
    subtype: 'enum',
    required: true
  },
  combinedIncome: {
    enum: [
      'yes',
      'no'
    ],
    text: 'Is the combined income of those listed on the application greater than $35,000?',
    type: 'string',
    order: 5,
    score: {
      no: 1
    },
    default: 'no',
    subtype: 'enum',
    required: true,
    dependsOn: {
      individualIncome: 'yes'
    }
  },
  countryOfOrigin: {
    text: 'What is your country of origin?',
    type: 'string',
    order: 1,
    score: {
      US: 0,
      default: 0
    },
    default: '',
    subtype: 'country',
    required: true,
    dependsOn: {
      usCitizen: 'yes'
    }
  },
  cashTransactions: {
    enum: [
      'yes',
      'no'
    ],
// Temp comment
    text: 'Do you expect more than $2,500 in cash transactions per month?',
    type: 'string',
    order: 8,
    score: {
      yes: 2
    },
    default: 'no',
    subtype: 'enum',
    required: true,
    exclude: ['CARD']
  },
  combinedIncome35000: {
    enum: [
      'yes',
      'no'
    ],
    text: 'Is the combined income of those listed on the application greater than $35,000?',
    type: 'string',
    order: 4,
    score: {
      no: 1
    },
