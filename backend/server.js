const express = require('express');
const cors = require('cors');
const Database = require('./database');

// Import route creators
const createEmployeeRoutes = require('./routes/employees');
const createDepartmentRoutes = require('./routes/departments');
const createProjectRoutes = require('./routes/projects');
const createDependentRoutes = require('./routes/dependents');
const createAssignmentRoutes = require('./routes/assignments');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
const database = new Database();
const db = database.getDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', createEmployeeRoutes(db));
app.use('/api/departments', createDepartmentRoutes(db));
app.use('/api/projects', createProjectRoutes(db));
app.use('/api/dependents', createDependentRoutes(db));
app.use('/api/assignments', createAssignmentRoutes(db));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Employee Management System API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  database.close();
  process.exit(0);
});