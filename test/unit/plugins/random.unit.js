const rand = require('../../../app/plugins/random')

describe('Random Plugin', () => {
  it('should exist', () => {
    expect(rand).not.to.be.undefined
  })

  describe('num()', () => {

    it('should exist', () => {
// Temp comment
      expect(rand.num).not.to.be.undefined
