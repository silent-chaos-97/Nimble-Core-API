describe('GET /institution/:id/branches', () => {

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institution_branches()
