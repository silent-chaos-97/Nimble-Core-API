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
    subtype: 'text',
    required: true,
    dependsOn: {
      milesAway: 'yes'
