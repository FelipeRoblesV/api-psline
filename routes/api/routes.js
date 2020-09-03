const express = require("express");

function apiRoutes() {
  const router = express.Router();
  var index = require("repository/api/api.routes")(router);
  var login = require("repository/api/login/login.routes")(router);
  var dashboard = require("repository/api/dashboard/dashboard.routes")(router);

  return router;
}

module.exports = apiRoutes;
