const uuid = require('uuid')

const THRESHOLDS = [
  { op: '>', val: 50, risk: 'Very High' },
  { op: '>=', val: 5, risk: 'High' },
  { op: '>', val: 2, risk: 'Moderate' },
  { op: '=', val: 2, risk: 'Two' },
  { op: '=', val: 1, risk: 'Low' },
  { op: '<=', val: 0, risk: 'Very Low' },
  { risk: '?' }
]

describe('app.services.bsaRiskResult.calculate', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('method', async() => {
    it('should exist', () => {
      expect(app.services.bsaRiskResult).to.have.ownProperty('calculate')
      expect(app.services.bsaRiskResult.calculate).to.be.an('Function')
    })

    it('should complain if called without params', async() => {
