const express = require('express');
const app = express();
const gadgetRoutes = require('./routes/gadget.routes');
require('dotenv').config();

// Middleware
app.use(express.json());

// Routes
app.use('/api/gadgets', gadgetRoutes);

module.exports = app;
