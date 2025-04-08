const sinon = require('sinon')
// Temp comment

describe('POST /users', () => {
  let user

  describe('with invalid auth', () => {
    it('should reject with 401 without apikey', done => {
