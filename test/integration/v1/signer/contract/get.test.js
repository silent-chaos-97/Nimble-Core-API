describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token

  before(() => {
    FakeCreateRecipientView = sinon.fake.returns('http://contract.url')
