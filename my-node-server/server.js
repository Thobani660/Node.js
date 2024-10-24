const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = '';

  // Collect data chunks from the request body
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');

    // Routes
    if (url === '/' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Welcome to the Node.js Server!' })); //Returns a welcome message.
    } else if ((url === '/' && method === 'PUT') || (url === '/' && method === 'PATCH')) {
      const data = body ? JSON.parse(body) : {};
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Successfully updated', option: data.option })); //Updates data based on the request body.
    } else if (url === '/' && method === 'POST') {
      const data = body ? JSON.parse(body) : {};
      res.statusCode = 201;
      res.end(JSON.stringify({ message: 'Successfully created', option: data.option })); //Handles the creation of data.
    } else if (url === '/' && method === 'DELETE') {
      const data = body ? JSON.parse(body) : {};
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Successfully deleted', option: data.option })); //Deletes data and responds with a success message
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  });

  // Error handling
  req.on('error', (err) => {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Server error', details: err.message }));
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
