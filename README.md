# auth0-userfromtoken

Simple little module to verify an RS256 token issued by Auth0.

## usage

```js
import verify from 'auth0-userfromtoken'

verify(token, AUTH0_CLIENT_DOMAIN)
  .then(user => {
    // do stuff with user here
  })
```

where `AUTH0_CLIENT_DOMAIN` is your Auth0 domain, and `token` is a token coming in from client.