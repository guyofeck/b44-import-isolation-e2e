# Agent notes

- Run in sandbox: `docker compose -f docker-compose.base44.yml up -d`. The compose bind-mounts the repo and runs `node --watch server.mjs`, so edits reload without rebuilds. (The `Dockerfile` bakes source and is not used by the Base44 compose.)
- Host validation (see README): local hosts always allowed; the preview host suffix is allowed only when `BASE44_SANDBOX=1`. Verify with
  `curl -H 'Host: evil.example' localhost:3000` → 400, `curl localhost:3000` → 200.
