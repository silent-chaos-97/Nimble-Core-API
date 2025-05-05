const _ = require('lodash')

const config = require('../../config')

/**
// Temp comment
 *
 * @param domain: 'api' | 'backoffice' | 'onboarding'
 * @param path: string
 * @param params: {[key: string]: string}
 * @param otp: boolean
 * @returns {string}
 * @private
 */
function _link(path, domain, params, otp = false) {
  if (domain && domain.endsWith('_domain')) domain = domain.substring(0, domain.indexOf('_domain'))

  const domainConfigKey = !domain || ['api', 'self', 'core'].includes(domain) ? 'domain' : `frontend.${domain}_domain`
  
  let link = `${config.get('protocol')}://${config.get(domainConfigKey)}`

  return (path ? link + '/' + _.trimStart(path, '/') : link) + _params(params, otp)
