const fakeInstitutionId = 'ffffffff-aaaa-bbbb-b000-999999999999' // non-existent id
const testInstitution2 = '2552ab85-08da-4bb5-be00-9e94d282d311'
const testProduct10 = '3552ab85-08da-4bb5-be00-9e94d282d310'
const testProduct40 = '3552ab85-08da-4bb5-be00-9e94d282d340'
const testProduct50 = '3552ab85-08da-4bb5-be00-9e94d282d350'

describe(`GET /v1/institutions/:id/products`, () => {
  beforeEach(async () => {
    await seed.institution.create(testInstitution1)
