const http = require('http');
const path = require('path');
const fs = require('fs');

// Creating a server that gets a request and response
const server = http.createServer((req, res) => {

    // Then look in the public folder and evaluate whatever the req.url is
    // if it's / we're gonna load index.html, if not we're gonna load whatever the file is called
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Then we're gonna get the extension of the file
    let extname = path.extname(filePath);

        
    // Then we're gonna evaluate the extension and set the content type based on it
    // The initial being html
    let contentType = 'text/html'

    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        };

    // Then we're gonna read the file and if there's an error we'll check for some error codes
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENO ENT') { // this code means page not found
                // Page not found, load the 404.html page
                fs.readFile(path.join(__dirname, 'public', '404.html'), (error, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Some other server error send a 500
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // If successful, we'll send a 200 and whatever the content type is
            res.writeHead(200, { 'Content-Type': contentType });
            // and send the content of the file
            res.end(content, 'utf8');
        }
    })


});

// Port not always going to be the same, gonna run on
// whatever our host is going to decide inside an environment variable
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
