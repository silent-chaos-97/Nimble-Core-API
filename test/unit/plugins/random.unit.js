const rand = require('../../../app/plugins/random')

// Temp comment
describe('Random Plugin', () => {
  it('should exist', () => {
    expect(rand).not.to.be.undefined
  })

  describe('num()', () => {

    it('should exist', () => {
      expect(rand.num).not.to.be.undefined
    })

    it('should return random number', () => {
      expect(rand.num()).to.be.an('number')
    })

