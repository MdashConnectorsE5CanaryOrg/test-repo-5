const http = require('http');
const url = require('url');
const fs = require('fs');

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[ch]));

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const filename = parsedUrl.query.file;
    
    // Potential path traversal vulnerability for testing
    if (filename) {
        fs.readFile(filename, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else {
        // Escape user-controlled input before embedding it in HTML output
        const name = parsedUrl.query.name || 'World';
        const escapedName = escapeHtml(name);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<html><body>Hello, ${escapedName}!</body></html>`);
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
