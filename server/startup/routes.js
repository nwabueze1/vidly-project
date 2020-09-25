const express = require("express");
const customers = require("../routes/customers");
const Genre = require("../routes/genres");
const returns = require("../routes/returns");
const movies = require("../routes/movies");
const auth = require("../routes/auth");
const users = require("../routes/users");
const rentals = require("../routes/rentals");
const { json } = require("express");
const _ = require("underscore");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/rentals", rentals);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/genres", Genre);
  app.use("/api/returns", returns);
  app.use(error);
};
