
/**
 * Schema for services.product.get
 * e.g. specifies filters supported
 */
function schema() {
  return Joi.object()
    .keys({
      id: Joi.string().uuid(),
      name: Joi.string(),
      category: Joi.string(),
      institutionId: Joi.string().uuid(),
    })
    .xor('id', 'name', 'category') // exclude 'institutionId' from xor
