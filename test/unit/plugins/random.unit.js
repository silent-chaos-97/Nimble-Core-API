const rand = require('../../../app/plugins/random')

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

    it('should return random number between 1 and 9', () => {
      for (let i = 0; i <= 1000; i++) {
        let num = rand.num()
        expect(num).to.be.at.least(1).and.at.most(9)
      }
    })

  })

  describe('letter()', () => {
