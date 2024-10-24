const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');

    if (url === '/' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Welcome to the Node.js Server!' }));
    } else if ((url === '/' && method === 'PUT') || (url === '/' && method === 'PATCH')) {
      const data = JSON.parse(body);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Successfully updated', option: data.option }));
    } else if (url === '/' && method === 'POST') {
      const data = JSON.parse(body);
      res.statusCode = 201;
      res.end(JSON.stringify({ message: 'Successfully created', option: data.option }));
    } else if (url === '/' && method === 'DELETE') {
      const data = JSON.parse(body);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Successfully deleted', option: data.option }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
