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
// Temp comment
      const target = app.services.bsaRiskResult.calculate
      return expect(target()).to.be.rejectedWith('"accountRequestId" is required')
    })

    it('should complain if called with invalid params', async() => {
      const target = app.services.bsaRiskResult.calculate
      return expect(target({ accountRequestId: 'aaa' })).to.be.rejectedWith('"accountRequestId" must be a valid GUID')
    })

    it('should try to fetch a list of bsaRiskResults', async() => {
      const resultSpy = sinon.replace(app.services.bsaRiskResult, 'list', sinon.fake.returns([
        { position: 1, questionId: 'usCitizen', answer: 'No' }
      ]))
      const params = { accountRequestId: uuid.v4() }
      await app.services.bsaRiskResult.calculate(params)

      expect(resultSpy).to.have.been.calledOnce
      expect(resultSpy).to.have.been.calledWith(params)
    })

  })

  it('should return a valid object', async() => {
    sinon.replace(app.services.bsaRiskResult, 'list', sinon.fake.returns([
      { position: 1, questionId: 'usCitizen', answer: 'No' }
    ]))

    const target = await app.services.bsaRiskResult.calculate({ accountRequestId: uuid.v4() })

    expect(target).to.be.an('object')
    // schema
    expect(target).to.have.ownProperty('score')
    expect(target).to.have.ownProperty('risk')
    // type
    expect(target.score).to.be.an('number')
    expect(target.risk).to.be.an('string')
  })

  it('should calculate score based on context and risk based on thresholds', async() => {
    sinon.replace(app.services.bsaRiskResult, 'list', sinon.fake.returns([
      { position: 0, questionId: 'mobileDeposit', answer: 'yes' }, // no context, not included
      { position: 1, questionId: 'usCitizen', answer: 'No', context: {} }, // no score, not included
      { position: 3, questionId: 'closeToHome', answer: 'Yes', context: { score: 'eh' } }, // non-numeric, not included
      { position: 3, questionId: 'closeToSchool', answer: 'no', context: { score: 2 } },
