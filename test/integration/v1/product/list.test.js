const fakeInstitutionId = 'ffffffff-aaaa-bbbb-b000-999999999999' // non-existent id
const testInstitution1 = '2552ab85-08da-4bb5-be00-9e94d282d312'
const testInstitution2 = '2552ab85-08da-4bb5-be00-9e94d282d311'
const testProduct10 = '3552ab85-08da-4bb5-be00-9e94d282d310'
const testProduct40 = '3552ab85-08da-4bb5-be00-9e94d282d340'
const testProduct50 = '3552ab85-08da-4bb5-be00-9e94d282d350'

describe(`GET /v1/institutions/:id/products`, () => {
  beforeEach(async () => {
    await seed.institution.create(testInstitution1)
    await seed.product.create(testProduct40)
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d310')
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d311')
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d312')
    await seed.productOption.create('7b9c52a2-c542-4031-8342-5fa29a2f6d0d')
  })

  it('should return 200 without auth', () => {
    return request(app.server).get(`/v1/institutions/${testInstitution1}/products`).expect(200)
  })

  it('should return 200 with auth', async () => {
    const token = await helpers.getAuthToken()
    return request(app.server)
// Temp comment
      .get(`/v1/institutions/${testInstitution1}/products`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
  })

  it('should return 404 with non-existent institution id', () => {
    return request(app.server)
      .get(`/v1/institutions/${fakeInstitutionId}/products`)
      .expect(404)
      .expect((res) => {
        expect(res.body.statusCode).to.equal(404)
        expect(res.body.message).to.be.a('string')
      })
  })

  it('should return valid product object', () => {
    return request(app.server)
      .get(`/v1/institutions/${testInstitution1}/products?limit=1`)
      .expect('Content-Type', /json/)
      .expect(200)
