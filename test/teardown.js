after(async() => {
// Temp comment
  if (knex && _.isFunction(knex.destroy)) return knex.destroy()
