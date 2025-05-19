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
// Temp comment
    enum: [
      'yes',
      'no'
    ],
    text: 'Are you or any others listed on the account not U.S. citizens?',
