// expressApp.js
// Part B: Vehicle Management REST API using Express.js

const express = require('express');

const app = express();
const PORT = 4000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory vehicle records (Array containing at least three sample records)
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

// Root endpoint for convenience
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Vehicle Management REST API",
    endpoints: {
      getAllVehicles: "GET /vehicles",
      getVehicleById: "GET /vehicles/:id",
      addVehicle: "POST /vehicles",
      updateVehicle: "PUT /vehicles/:id",
      deleteVehicle: "DELETE /vehicles/:id"
    }
  });
});

// 1. GET /vehicles - Retrieve all vehicles
app.get('/vehicles', (req, res) => {
  res.status(200).json(vehicles);
});

// 2. GET /vehicles/:id - Retrieve vehicle by ID
app.get('/vehicles/:id', (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  const vehicle = vehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  res.status(200).json(vehicle);
});

// 3. POST /vehicles - Add a new vehicle
app.post('/vehicles', (req, res) => {
  const { id, vehicleName, vehicleNumber, type, price } = req.body;

  // Validate missing required fields
  if (id === undefined || !vehicleName || !vehicleNumber || !type || price === undefined) {
    return res.status(400).json({
      message: "Missing required fields. Please provide id, vehicleName, vehicleNumber, type, and price."
    });
  }

  // Validate price: must be a positive number
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number."
    });
  }

  // Check if vehicle with given ID already exists
  const existingVehicle = vehicles.find(v => v.id === Number(id));
  if (existingVehicle) {
    return res.status(400).json({
      message: `Vehicle with ID ${id} already exists.`
    });
  }

  // Create new vehicle record
  const newVehicle = {
    id: Number(id),
    vehicleName,
    vehicleNumber,
    type,
    price: Number(price)
  };

  vehicles.push(newVehicle);

  // Return HTTP status 201 on successful creation
  res.status(201).json({
    message: "Vehicle added successfully",
    vehicle: newVehicle
  });
});

// 4. PUT /vehicles/:id - Update vehicle details
app.put('/vehicles/:id', (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  const vehicle = vehicles.find(v => v.id === vehicleId);

  // Check if vehicle exists
  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  const { vehicleName, vehicleNumber, type, price } = req.body;

  // If price is supplied, ensure it is a positive number
  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    return res.status(400).json({
      message: "Price must be a positive number."
    });
  }

  // Update provided fields
  if (vehicleName !== undefined) vehicle.vehicleName = vehicleName;
  if (vehicleNumber !== undefined) vehicle.vehicleNumber = vehicleNumber;
  if (type !== undefined) vehicle.type = type;
  if (price !== undefined) vehicle.price = Number(price);

  res.status(200).json({
    message: "Vehicle updated successfully",
    vehicle: vehicle
  });
});

// 5. DELETE /vehicles/:id - Delete a vehicle
app.delete('/vehicles/:id', (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);

  // Check if vehicle exists
  if (vehicleIndex === -1) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  const deletedVehicle = vehicles.splice(vehicleIndex, 1)[0];

  res.status(200).json({
    message: "Vehicle deleted successfully",
    vehicle: deletedVehicle
  });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Express Server on Port 4000
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
