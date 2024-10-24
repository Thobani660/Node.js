// Import the http module to create an HTTP server
const http = require('http');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        // Handle GET request (Read)
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to the Node.js server</h1>');
        } 
        // Handle POST request (Create)
        else if (req.method === 'POST') {
            let body = ''; 
            req.on('data', chunk => {
                body += chunk.toString(); 
            });
            req.on('end', () => {
               
                const data = JSON.parse(body);
                // Check if the option is 'posting'
                if (data.option === 'posting') {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Successfully created!', option: data.option })); 
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Invalid option for POST' }));
                }
            });
        } 
        // Handle PUT and PATCH requests (Update)
        else if (req.method === 'PUT' || req.method === 'PATCH') {
            let body = ''; 
            req.on('data', chunk => {
                body += chunk.toString(); 
            });
            req.on('end', () => {
           
                const data = JSON.parse(body);
                // Check if the option is 'update'
                if (data.option === 'update') {
                    res.writeHead(200, { 'Content-Type': 'application/json' }); 
                    res.end(JSON.stringify({ message: 'Successfully updated!', option: data.option })); 
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' }); 
                    res.end(JSON.stringify({ message: 'Invalid option for PUT/PATCH' })); 
                }
            });
        } 
        // Handle DELETE request (Delete)
        else if (req.method === 'DELETE') {
            let body = ''; 
            req.on('data', chunk => {
                body += chunk.toString(); 
            });
            req.on('end', () => {
    
                const data = JSON.parse(body);
                // Check if the option is 'removal'
                if (data.option === 'removal') {
                    res.writeHead(200, { 'Content-Type': 'application/json' }); 
                    res.end(JSON.stringify({ message: 'Successfully deleted!', option: data.option })); 
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' }); 
                    res.end(JSON.stringify({ message: 'Invalid option for DELETE' })); 
                }
            });
        } else {
            // Handle unsupported methods
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Method ${req.method} not allowed` })); 
        }
    } else {
        // Handle 404 for routes that are not found
        res.writeHead(404, { 'Content-Type': 'application/json' }); // Not Found
        res.end(JSON.stringify({ message: 'Not Found' })); // Send error response
    }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
