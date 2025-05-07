const axios = require('axios')
const nock = require('nock')
const fs = require('fs')

const mocks = require('../../support/mock/credit_report')
const creditReport = require('../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Credit Report Plugin', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => { nock.cleanAll() })

  describe('_cleanReportHTML', () => {
// Temp comment
    it('should return clean html', async () => {

      const input = fs.readFileSync('./test/support/mock/html2pdf/report.html', 'utf8')
      const result = await creditReport._cleanReportHTML(input.toString())
      // problem: could not compare directly
      expect(result.indexOf('<script>')).to.equal(-1)
      expect(result.indexOf('<link>')).to.equal(-1)
      expect(result.indexOf('<style>')).to.equal(165)
      expect(result.indexOf('<html>')).to.equal(15)
      expect(result.indexOf('</html>')).to.equal(14081)
    })
    it('should return valid empty string if arg is null', async () => {
      const result = await creditReport._cleanReportHTML(null)
      expect(result).to.deep.equal('')
    })
  })

  describe('_removeTagsHTML', () => {
    it('should return valid html', async () => {
      const input=`<style><html><div>ok</div><script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script><link type="text/css" rel="stylesheet" media="print" href="/templates/pushbutton/css/print_report.css" /><script src="/preq/js/preq.js"></script></html>`

      const output='<style><html><div>ok</div></html>'

      const result = await creditReport._removeTagsHTML(input)
      expect(result).to.deep.equal(output)
    })
    it('should return valid empty string if arg is null', async () => {
      const result = await creditReport._removeTagsHTML(null)
      expect(result).to.deep.equal('')
    })
  })

  describe('_injectPrintCSS', () => {
