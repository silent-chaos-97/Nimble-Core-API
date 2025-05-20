/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('key_values', table => {
