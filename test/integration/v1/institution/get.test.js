describe('GET /institution/:domain', () => {
  let token

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
