describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token

  before(() => {
