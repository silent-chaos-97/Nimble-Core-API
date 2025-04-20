const axios = require('axios')
const nock = require('nock')
const fs = require('fs')

const mocks = require('../../support/mock/credit_report')
const creditReport = require('../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Credit Report Plugin', () => {

    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => { nock.cleanAll() })

  describe('_cleanReportHTML', () => {
    it('should return clean html', async () => {

      const input = fs.readFileSync('./test/support/mock/html2pdf/report.html', 'utf8')
      const result = await creditReport._cleanReportHTML(input.toString())
      // problem: could not compare directly
      expect(result.indexOf('<script>')).to.equal(-1)
      expect(result.indexOf('<link>')).to.equal(-1)
      expect(result.indexOf('<style>')).to.equal(165)
      expect(result.indexOf('<html>')).to.equal(15)
      expect(result.indexOf('</html>')).to.equal(14081)
