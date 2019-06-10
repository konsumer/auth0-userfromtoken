# auth0-verify

Simple little module to verify an RS256 token issued by Auth0.

## usage

```
import verify from 'auth0-verify'

const run = async () => {
  const user = verify(token, AUTH0_CLIENT_DOMAIN)
}
run()
```

where `AUTH0_CLIENT_DOMAIN` is your Auth0 domain, and `token` is a token coming in from client.