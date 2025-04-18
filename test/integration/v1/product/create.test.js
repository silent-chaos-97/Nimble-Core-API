const prodId = '3552ab85-08da-4bb5-be00-9e94d282d350'

describe('POST /institutions/:id/products', () => {
  let product

  beforeEach(async () => {
    await seed.institution.create(institutionId)
    product = _.omit(blueprints.product.get(prodId), ['id', 'createdAt', 'content', 'options'])
    product.contentRaw = 'An **example** markdown'
  })

