import http from 'node:http';
const html = '<!doctype html><html><head><title>Import isolation fixture</title></head><body><h1>Public isolation fixture</h1><p>Disposable test data only.</p></body></html>';

// Host validation: local hosts are always allowed. Inside the Base44 sandbox
// (BASE44_SANDBOX === '1') the preview proxy's host suffix is also allowed.
const allowedHosts = new Set(['localhost', '127.0.0.1']);
const sandboxDomain = process.env.BASE44_SANDBOX === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN
  ? process.env.BASE44_SANDBOX_HOST_DOMAIN.toLowerCase()
  : null;

function isAllowedHost(hostHeader) {
  if (!hostHeader) return false;
  const host = hostHeader.toLowerCase().replace(/:\d+$/, '');
  if (allowedHosts.has(host)) return true;
  return sandboxDomain !== null && host.endsWith('.' + sandboxDomain);
}

http.createServer((req, res) => {
  if (!isAllowedHost(req.headers.host)) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Invalid Host header');
    return;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen(3000, '0.0.0.0');
