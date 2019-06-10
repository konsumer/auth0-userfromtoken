const fetch = require('isomorphic-fetch')
const jwt = require('jsonwebtoken')

const getJWKS = async (domain) => {
  if (getJWKS.cached) {
    return getJWKS.cached
  }
  const r = await fetch(`https://${domain}/.well-known/jwks.json`)
  getJWKS.cached = await r.json()
  return getJWKS.cached
}

const verify = async (tokenSource, domain) => {
  const authinfo = await getJWKS(domain)
  if (!authinfo && !authinfo.keys) {
    throw new Error("Don't have auth0 token for some reason")
  }
  const token = jwt.decode(tokenSource, { complete: true })
  if (!token) {
    throw new Error('Could not decode token')
  }
  if (token.header.alg !== 'RS256') {
    throw new Error('Invalid algorithm.')
  }
  const sigKey = authinfo.keys.find(k => k.kid === token.header.kid)
  if (!sigKey) {
    throw new Error("Couldn't find signing-key.")
  }
  const user = jwt.verify(
    tokenSource,
    `-----BEGIN CERTIFICATE-----\n${
      sigKey.x5c[0]
    }\n-----END CERTIFICATE-----`,
    { algorithms: ['RS256'] }
  )
  if (!user) {
    throw new Error()
  }
  return user
}

module.exports = verify
