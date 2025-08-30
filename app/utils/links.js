const _ = require('lodash')

const config = require('../../config')

/**
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
}

function _params(params, otp = false) {
  const q = params || {}
  if (otp) q.otp = '' // FIXME: define name and get actual otp

  return '' // FIXME: build params from obj
}

module.exports = {
  api: path => _link(path, 'api'),
  backoffice: path => _link(path, 'backoffice'),
  onboarding: path => _link(path, 'onboarding'),
  link: (path, domain) => _link(path, domain)
}
