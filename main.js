const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/') { // If it's / then we know that's the index page
        res.writeHead(200, { 'Content-Type': 'text/html'}); // adding a 200 response, 
        // meaning everything's ok, and setting the content type
        res.end('<h1>Homepage</h1>'); // can serve HTML
    };
});

// Port not always going to be the same, gonna run on
// whatever our host is going to decide inside an environment variable
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
