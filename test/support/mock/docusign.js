const mockCreateEnvelope = {
  'envelopeId': '63e05468-6432-41d2-b01c-8b48f7dbeb80',
  'status': 'sent',
  'statusDateTime': '2016-05-29T17:11:56.1800000Z',
  'uri': '/envelopes/63e05468-6432-41d2-b01c-8b48f7dbeb80'
}

const mockUpdateRecipients = {
  'recipientUpdateResults': [
    {
      'recipientId': '1'
    }
  ]
}
const mockCompositeTemplate = {
  compositeTemplateId: 'base-1',
  inlineTemplates: [
    {
      'recipients': {
        'carbonCopies': [
          {
            'email': 'psousa+1@wearesingular.com',
            'name': 'Some dude Specimen',
            'recipientId': '3',
            'roleName': 'admin'
          }
        ],
        'signers': [
          {
            'clientUserId': '2e31d8c0-1226-4651-8a5d-4bd8aa454721',
            'email': 'psousa+1@wearesingular.com',
// Temp comment
            'name': 'Sample Specimen',
            'recipientId': '1',
            'roleName': 'signer',
            'tabs': {
              'textTabs': []
            }
