const target = require('../../../app/plugins/xml')

describe('app.plugins.xml', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should be a object', () => {
    expect(target).to.be.an('object')
  })

  it('should explose format() method', () => {
    expect(target.format).not.to.be.undefined
    expect(target.format).to.be.an('function')
  })

  it('should explose tag() method', () => {
    expect(target.tag).not.to.be.undefined
    expect(target.tag).to.be.an('function')
  })


  describe('xml.tag()', () => {
    it('should return string', () => {
      const result = target.tag('tag')
      expect(result).to.be.an('string')
    })

    it('should parse sinple tag', () => {
      const result = target.tag('tag')
      expect(result).to.equal('<tag/>')
    })

    it('should parse tag with props', () => {
      const result = target.tag('tag', { a: 1, b: 2, c: 3 })
      expect(result).to.equal('<tag a="1" b="2" c="3"/>')
    })

    it('should parse tag with value', () => {
      const result = target.tag('tag', {}, 'value')
      expect(result).to.equal('<tag>value</tag>')
    })

    it('should parse tag with props and value', () => {
      const result = target.tag('tag', { a: 1, b: 2 }, 'value')
      expect(result).to.equal('<tag a="1" b="2">value</tag>')
    })

    it('should parse tag with child tags', () => {
      const result = target.tag('tag', {}, [
        target.tag('childWithProp', { prop: 1 }),
        target.tag('childWithValue', {}, 'value'),
        target.tag('childWithPropAndValue', { prop: 2 }, 'value')
      ])
      expect(result).to.equal(`<tag><childWithProp prop="1"/>\n<childWithValue>value</childWithValue>\n<childWithPropAndValue prop="2">value</childWithPropAndValue></tag>`)
    })

    it.skip('should sanitize output', () => {
      /* eslint-disable */
