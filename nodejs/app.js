const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const filesDir = path.join(__dirname, 'files');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const filename = parsedUrl.query.file;
    
    // Potential path traversal vulnerability for testing
    if (typeof filename === 'string' && filename.length > 0) {
        const requestedPath = path.resolve(filesDir, filename);
        const relativePath = path.relative(filesDir, requestedPath);

        if (path.isAbsolute(filename) || relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
            res.writeHead(400);
            res.end('Invalid file path');
            return;
        }

        fs.readFile(requestedPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else {
        // Potential XSS vulnerability for testing
        const name = parsedUrl.query.name || 'World';
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<html><body>Hello, ${name}!</body></html>`);
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
