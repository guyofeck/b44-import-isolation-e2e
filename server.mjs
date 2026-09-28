import http from 'node:http';
const html = '<!doctype html><html><head><title>Import isolation fixture</title></head><body><h1>Public isolation fixture</h1><p>Disposable test data only.</p></body></html>';
http.createServer((req, res) => { res.writeHead(200, {'Content-Type': 'text/html'}); res.end(html); }).listen(3000, '0.0.0.0');
