# Public import isolation fixture

Disposable test data for verifying Base44 imported-app GitHub permissions.

Run `node server.mjs` and open port 3000. No dependencies or secrets.

## Host validation

The server only answers requests whose `Host` header is `localhost` or
`127.0.0.1` (any port). Any other host gets `400 Invalid Host header`.

Base44 sandbox override: when `BASE44_SANDBOX` is exactly `1`, hosts ending in
`.$BASE44_SANDBOX_HOST_DOMAIN` (the Base44 preview proxy's host) are also
allowed. When `BASE44_SANDBOX` is unset or any other value, only the local
hosts are accepted. `docker-compose.base44.yml` passes both variables through
from the platform; never hardcode them.
