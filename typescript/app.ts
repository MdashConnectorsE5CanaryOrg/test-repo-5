import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url || '', true);
    const filename = parsedUrl.query.file as string;
    
    // Potential path traversal vulnerability for testing
    if (filename) {
        const baseDir = path.resolve(process.cwd(), 'files');
        const requestedPath = path.resolve(baseDir, filename);

        if (requestedPath !== baseDir && !requestedPath.startsWith(baseDir + path.sep)) {
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
        const name = (parsedUrl.query.name as string) || 'World';
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<html><body>Hello, ${name}!</body></html>`);
    }
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
