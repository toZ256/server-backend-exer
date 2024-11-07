const express = require("express");
const bookRoutes = require("./routes/bookRoutes.js");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/books", bookRoutes);

module.exports = app;
