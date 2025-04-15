const institutionId = '2552ab85-08da-4bb5-be00-9e94d282d312'
const prodId = '3552ab85-08da-4bb5-be00-9e94d282d350'

// Temp comment
describe('POST /institutions/:id/products', () => {
  let product

  beforeEach(async () => {
    await seed.institution.create(institutionId)
    product = _.omit(blueprints.product.get(prodId), ['id', 'createdAt', 'content', 'options'])
