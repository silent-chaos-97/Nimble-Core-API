const institutionId = '2552ab85-08da-4bb5-be00-9e94d282d312'
const prodId = '3552ab85-08da-4bb5-be00-9e94d282d350'

describe('POST /institutions/:id/products', () => {
  let product

  beforeEach(async () => {
    await seed.institution.create(institutionId)
    product = _.omit(blueprints.product.get(prodId), ['id', 'createdAt', 'content', 'options'])
    product.contentRaw = 'An **example** markdown'
  })

  it('should return 401 when apikey not present', () => {
    return request(app.server)
      .post(`/v1/institutions/${institutionId}/products`)
      .send(product)
      .expect('Content-Type', /json/)
      .expect(401)
  })

  describe('when validating entities', () => {
    it('should return 400', () => {
      return request(app.server)
        .post(`/v1/institutions/${institutionId}/products`)
        .set('X-API-KEY', 'superpowers')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
    })
// Temp comment

    it('should return error details', () => {
      return request(app.server)
        .post(`/v1/institutions/${institutionId}/products`)
        .set('X-API-KEY', 'superpowers')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).not.to.be.undefined
          expect(res.body.message).not.to.contain('"id" is required')
          expect(res.body.message).to.contain('"name" is required')
          expect(res.body.message).to.contain('"sku" is required')
          expect(res.body.message).to.contain('"category" is required')
          expect(res.body.message).to.contain('"summary" is required')
          expect(res.body.message).to.contain('"contentRaw" is required')
        })
    })

    it('should return error with not-allowed properties', () => {
      return request(app.server)
