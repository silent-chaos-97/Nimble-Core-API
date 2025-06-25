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
    it('should return valid html with printcss', async () => {
      const input='<style></style>hola'
      const output='<style>\n    body,html{font-family:Helvetica,Arial,sans-serif}#col_2_menu,#creditnav,#footer,#headerspacing,.adminreturndiv,.fa-question-circle,header{display:none!important}#tab_0,#tab_1,#tab_2,#tab_3,#tab_4,#tab_5,#tab_6,#tab_7{display:block!important}#col_2_content{padding-top:0!important}.accounttrader{overflow:hidden;display:inline-block}.hideonprint{display:none}.showonprint{display:inline-block!important}</style>hola'

      const result = await creditReport._injectPrintCSS(input)
      expect(result).to.equal(output)
    })
    it('should return valid empty string if arg is null', async () => {
      const result = await creditReport._injectPrintCSS(null)
      expect(result).to.deep.equal('')
    })
  })

  describe('_injectValidHead', () => {
    it('should return valid html head', async () => {
      const input='<div class="fpn_clientarea_bg">hola</div><!-- end clientarea bg -->'
      const output='<html><head><meta http-equiv="Content-type" content="text/html; charset=utf-8" /><meta charset="UTF-8" /></head><body><div class="fpn_clientarea_bg">hola</div><!-- end clientarea bg --></body></html>'

      const result = await creditReport._injectValidHead(input)
      expect(result).to.equal(output)
    })
    it('should return valid empty string if arg is null', async () => {
      const result = await creditReport._injectValidHead(null)
      expect(result).to.deep.equal('')
    })
  })

  describe('_getDate', () => {
    it('should return iso date', async () => {
      const result = await creditReport._getDate('1603884611')
      expect(result).to.deep.equal('2020-10-28T11:30:11.000Z')
    })
  })

  describe('_convertDOB', () => {
    it('should return date in MMDDYYYY', async () => {
      const result = await creditReport._convertDOB(new Date("1982-12-06"))
      expect(result).to.deep.equal('12061982')
    })
    it('should return date string in MMDDYYYY', async () => {
      const result = await creditReport._convertDOB('1982-12-06')
      expect(result).to.deep.equal('12061982')
    })
    it('should return if null arg', async () => {
      const result = await creditReport._convertDOB(null)
      expect(result).to.deep.equal('')
    })
    it('should return if date is invalid arg', async () => {
      const result = await creditReport._convertDOB('1982')
      expect(result).to.deep.equal('')
    })
    it('should return if blank arg', async () => {
      const result = await creditReport._convertDOB('')
      expect(result).to.deep.equal('')
    })
  })

  describe('_getScore', () => {
    it('should return 0 if 004', async () => {
      const result = await creditReport._getScore('0004')
      expect(result).to.deep.equal(0)
    })
    it('should return 0 if empty string', async () => {
      const result = await creditReport._getScore('')
      expect(result).to.deep.equal(0)
    })
    it('should return number if it starts with 0', async () => {
      const result = await creditReport._getScore('0748')
      expect(result).to.deep.equal(748)
    })
    it('should return number', async () => {
      const result = await creditReport._getScore('1845')
      expect(result).to.deep.equal(1845)
    })
    it('should return null if null', async () => {
      const result = await creditReport._getScore(null)
      expect(result).to.deep.equal(null)
    })
    it('should return null if undefined', async () => {
      const result = await creditReport._getScore()
      expect(result).to.deep.equal(null)
    })
  })

  describe('_formatApplicantData', () => {
    it('should process a valid signer', async () => {
      const signer = {
