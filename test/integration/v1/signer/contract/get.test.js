describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token

  before(() => {
    FakeCreateRecipientView = sinon.fake.returns('http://contract.url')
    sinon.replace(app.plugins.docusign, 'createRecipientView', FakeCreateRecipientView)

    token = app.services.token.get({
      scopes: ['signers'],
      resources: [
        `signers#00000000-9999-aaaa-0000-2ea08a01e901`,
        `signers#00000000-9999-aaaa-0000-2ea08a01e902`,
        `signers#00000000-9999-aaaa-0000-2ea08a01e903`,
      ],
      expiration: 1200
    })

    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    nock.enable()
  })

