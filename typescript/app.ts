import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[ch] as string));
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url || '', true);
    const filename = parsedUrl.query.file as string;
    
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
        // Potential XSS vulnerability for testing
        const name = (parsedUrl.query.name as string) || 'World';
        const escapedName = escapeHtml(name);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<html><body>Hello, ${escapedName}!</body></html>`);
    }
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
