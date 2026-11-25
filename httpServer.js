// httpServer.js
// Part A: Vehicle Management Web Application using Node.js Core Modules (http, fs)

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// In-memory vehicle records (Array of objects)
let vehicles = [
  {
    id: 1,
    vehicleName: "Hyundai Creta",
    vehicleNumber: "HR26AB1234",
    type: "SUV",
    price: 1500000
  },
  {
    id: 2,
    vehicleName: "Honda City",
    vehicleNumber: "DL01CD5678",
    type: "Sedan",
    price: 1200000
  },
  {
    id: 3,
    vehicleName: "Tata Nexon",
    vehicleNumber: "UP16EF9012",
    type: "SUV",
    price: 1300000
  }
];

// Create HTTP Server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Route: GET /
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vehicle Management System</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f7f9fc; }
            .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; }
            ul { line-height: 1.8; }
            a { color: #3498db; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Welcome to Vehicle Management Web Application</h1>
            <p>This server is built using Node.js built-in <strong>HTTP</strong> and <strong>FS</strong> modules.</p>
            <h3>Available Endpoints:</h3>
            <ul>
              <li><a href="/">/</a> - Welcome page (HTML)</li>
              <li><a href="/vehicles">/vehicles</a> - View all vehicle records (JSON)</li>
              <li><a href="/about">/about</a> - Application Information</li>
              <li><a href="/info">/info</a> - Static Info page served using FS module</li>
              <li><code>POST /add-vehicle</code> - Add a new vehicle (JSON payload)</li>
            </ul>
          </div>
        </body>
      </html>
    `);
  }

  // Route: GET /vehicles
  else if (method === 'GET' && url === '/vehicles') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(vehicles, null, 2));
  }

  // Route: GET /about
  else if (method === 'GET' && url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>About - Vehicle Management</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f7f9fc; }
            .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; }
            p { font-size: 16px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>About Application</h1>
            <p><strong>Project:</strong> Vehicle Management Web Application</p>
            <p><strong>Course:</strong> Full Stack Development - Node.js Lab Examination (MT1-LABEXAM)</p>
            <p><strong>Description:</strong> Demonstrates server creation, routing, request methods handling, static file delivery with FS module, and in-memory data management using vanilla Node.js.</p>
            <p><a href="/">Back to Home</a></p>
          </div>
        </body>
      </html>
    `);
  }

  // Route: GET /info (Static File Serving using FS Module)
  else if (method === 'GET' && url === '/info') {
    const filePath = path.join(__dirname, 'public', 'info.html');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error: Unable to read static file.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  // Route: POST /add-vehicle
  else if (method === 'POST' && url === '/add-vehicle') {
    let body = '';

    // Receive incoming data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When request body is fully received
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        const { id, vehicleName, vehicleNumber, type, price } = parsedData;

        // Validation: Required fields check
        if (!id || !vehicleName || !vehicleNumber || !type || price === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: "Bad Request: Missing required fields (id, vehicleName, vehicleNumber, type, price)"
          }));
        }

        // Validation: Price must be a positive number
        if (typeof price !== 'number' || price <= 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: "Bad Request: Price must be a positive number"
          }));
        }

        // Add the new vehicle record
        const newVehicle = {
          id: Number(id),
          vehicleName,
          vehicleNumber,
          type,
          price: Number(price)
        };

        vehicles.push(newVehicle);

        // Success response
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: "Vehicle added successfully",
          vehicle: newVehicle
        }, null, 2));

      } catch (error) {
        // Handle invalid JSON format
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: "Bad Request: Invalid JSON format"
        }));
      }
    });
  }

  // Route: 404 Not Found for any other routes
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>404 Not Found</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #e74c3c;">404 - Not Found</h1>
          <p>The requested route <code>${url}</code> with method <code>${method}</code> does not exist.</p>
          <a href="/">Go to Home</a>
        </body>
      </html>
    `);
  }
});

// Start Server on Port 3000
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
