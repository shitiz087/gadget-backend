const express = require('express');
const app = express();
require('dotenv').config();

const gadgetRoutes = require('../src/routes/gadget.routes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/gadgets', gadgetRoutes);

module.exports = app;
