const express = require("express");
const app = express();
require("dotenv").config();

const gadgetRoutes = require("./routes/gadget.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/api/gadgets", gadgetRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
