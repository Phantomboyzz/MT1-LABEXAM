# MT1-LABEXAM: Vehicle Management Web Application

**Full Stack Development – Node.js Lab Examination**  
**Technologies:** Node.js, HTTP Module, FS Module, Express.js  
**Database:** In-memory JavaScript Array

---

## 1. Project Overview

This project implements a clean, lightweight Vehicle Management Web Application divided into two independent servers:
- **Part A (`httpServer.js`):** Built using Node.js core `http` and `fs` modules (running on port `3000`). Demonstrates server creation, manual routing, serving static files, and reading raw POST request streams.
- **Part B (`expressApp.js`):** Built using `Express.js` (running on port `4000`). Implements full RESTful CRUD operations (GET, POST, PUT, DELETE) with JSON body parsing and validation.

---

## 2. Project Structure

```text
MT1-LABEXAM/
|-- .gitignore
|-- package.json
|-- README.md
|-- httpServer.js       # Part A: Core HTTP and FS module server (Port 3000)
|-- expressApp.js       # Part B: Express.js REST API server (Port 4000)
|-- public/
|   `-- info.html       # Static file served via FS module
`-- screenshots/        # Folder to store lab screenshots for submission
```

---

## 3. Installation & Setup

1. Open your terminal and navigate to the project directory:
   ```bash
   cd MT1-LABEXAM
   ```

2. Install dependencies (only Express is needed):
   ```bash
   npm install
   ```

---

## 4. Running the Servers

### Server 1: Core HTTP Server (Part A)
Run the following command in terminal:
```bash
node httpServer.js
```
*Expected Console Output:*
```text
HTTP Server running at http://localhost:3000
```

**Browser Endpoints:**
- Welcome Page: [http://localhost:3000/](http://localhost:3000/)
- Vehicle List (JSON): [http://localhost:3000/vehicles](http://localhost:3000/vehicles)
- About Info: [http://localhost:3000/about](http://localhost:3000/about)
- Static Info Page (via FS module): [http://localhost:3000/info](http://localhost:3000/info)

---

### Server 2: Express REST API Server (Part B)
Open a second terminal window and run:
```bash
node expressApp.js
```
*Expected Console Output:*
```text
Express Server running at http://localhost:4000
```

---

## 5. API Testing (Postman / cURL)

### Express API Endpoints (Port 4000)

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| **GET** | `http://localhost:4000/vehicles` | Retrieve all vehicles | 200 OK |
| **GET** | `http://localhost:4000/vehicles/1` | Retrieve vehicle by ID | 200 OK (or 404) |
| **POST** | `http://localhost:4000/vehicles` | Add a new vehicle | 201 Created (or 400) |
| **PUT** | `http://localhost:4000/vehicles/1` | Update vehicle details | 200 OK (or 404/400) |
| **DELETE** | `http://localhost:4000/vehicles/1` | Delete a vehicle | 200 OK (or 404) |

#### Sample POST Request Body:
- **URL:** `http://localhost:4000/vehicles`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "id": 4,
  "vehicleName": "Maruti Swift",
  "vehicleNumber": "DL8CAF5030",
  "type": "Hatchback",
  "price": 750000
}
```

*Expected Response (201 Created):*
```json
{
  "message": "Vehicle added successfully",
  "vehicle": {
    "id": 4,
    "vehicleName": "Maruti Swift",
    "vehicleNumber": "DL8CAF5030",
    "type": "Hatchback",
    "price": 750000
  }
}
```

---

## 6. Screenshots Checklist for Submission
Save screenshots into the `screenshots/` directory:
1. `http_server_running.png` — Terminal showing `httpServer.js` running on port 3000.
2. `static_file_serving.png` — Browser showing `/info` rendered from `public/info.html`.
3. `postman_get_all.png` — Postman GET request to `http://localhost:4000/vehicles`.
4. `postman_get_by_id.png` — Postman GET request to `http://localhost:4000/vehicles/1`.
5. `postman_post.png` — Postman POST request to `http://localhost:4000/vehicles` returning status 201.
6. `postman_put.png` — Postman PUT request to `http://localhost:4000/vehicles/1` updating details.
7. `postman_delete.png` — Postman DELETE request to `http://localhost:4000/vehicles/1`.
