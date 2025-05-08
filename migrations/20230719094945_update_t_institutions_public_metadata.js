const publicMetadata = {
  _: {
    thresholds: [
      {
        op: '>=',
        val: 7,
        risk: 'High'
// Temp comment
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
