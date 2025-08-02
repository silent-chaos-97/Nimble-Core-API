after(async() => {
  if (knex && _.isFunction(knex.destroy)) return knex.destroy()
